using Quartz;
using System;
using System.Text;
using System.Reflection;
using System.Formats.Asn1;
using GraphQL;
using GraphQL.Types;
using GraphQL.Server;
using GraphQL.Validation;
using GraphQL.MicrosoftDI;
using GraphQL.Authorization;
using GraphQL.SystemTextJson;
using TimeTrackerApp.Helpers;
using TimeTrackerApp.Business.Services;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.MsSql.Migrations;
using TimeTrackerApp.MsSql.Repositories;
using TimeTrackerApp.GraphQL.GraphQLSchema;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FluentMigrator.Runner;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.MsSql.Migrations;
using TimeTrackerApp.BackgroundTasks;
using TimeTrackerApp.Services;
using VacationResponse = TimeTrackerApp.MsSql.Migrations.VacationResponse;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetConnectionString(Constants.DatabaseConnectionStringAzure);

builder.Services.AddSingleton<IAuthenticationTokenRepository>(provider => new AuthenticationTokenRepository(connectionString));
builder.Services.AddSingleton<IRecordRepository>(provider => new RecordRepository(connectionString));
builder.Services.AddSingleton<IUserRepository>(provider => new UserRepository(connectionString));
builder.Services.AddSingleton<ICalendarRepository>(provider => new CalendarRepository(connectionString));
builder.Services.AddSingleton<IVacationRepository, VacationRepository>();
builder.Services.AddSingleton<IVacationResponse,VacationResponseRepository>();
builder.Services.AddSingleton<IVacationManagment>(provider => new VacationManagmentRepository(connectionString));
builder.Services.AddSingleton<IBackgroundTaskRepository>(provider => new BackgroundTaskRepository(connectionString));


builder.Services.AddTransient<AuthorizationSettings>(provider => new CustomAuthorizationSettings());
builder.Services.AddTransient<IValidationRule, AuthorizationValidationRule>();
builder.Services.AddTransient<IAuthorizationEvaluator, AuthorizationEvaluator>();

// builder.Services.AddSingleton<IHostedService, MyBackgroundTask>();
builder.Services.AddHostedService<BackgroundTaskService>();
builder.Services.AddScoped<IBackgroundTask, AutoCreateRecordsTask>();
builder.Services.AddScoped<AutoCreateRecordsTask>();

// builder.Services.AddFluentMigratorCore().
//     ConfigureRunner(config =>config.AddSqlServer()
//         .WithGlobalConnectionString(connectionString)
//         /* typeof(migration) миграция яка буде використовуватисб ,
//          также нужно в класе всегда помечать [migration(nummberId)] */
//         .ScanIn(typeof(ChangeVacationResponse).Assembly)
//         .For.All())
//     .AddLogging(config=>config.AddFluentMigratorConsole());


// Add services to the container.
builder.Services.AddCors(
    builder => {
        builder.AddPolicy("DefaultPolicy", option =>
        {
            option.AllowAnyMethod();
            option.AllowAnyOrigin();
            option.AllowAnyHeader();
        });
    }
);

JwtTokenService.Configuration = builder.Configuration;

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration[$"Jwt:{Constants.JwtTokenIssuer}"],
        ValidAudience = builder.Configuration[$"Jwt:{Constants.JwtTokenAudience}"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration[$"Jwt:{Constants.JwtSecretKey}"])),
        ClockSkew = TimeSpan.Zero
    };
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
});

builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllersWithViews();

builder.Services.AddGraphQL(b => b
                .AddHttpMiddleware<ISchema>()
                .AddUserContextBuilder(context => new GraphQLUserContext(context.User))
                .AddValidationRule<AuthorizationValidationRule>()
                .AddSystemTextJson()
                .AddErrorInfoProvider(options => options.ExposeExceptionStackTrace = true)
                .AddSchema<AppSchema>()
                .AddGraphTypes(typeof(AppSchema).Assembly));

builder.Services.AddQuartz(service =>
{
    service.UseMicrosoftDependencyInjectionJobFactory();
    service.AddJob<AutoCreateRecordsTask>(options => options.WithIdentity(new JobKey(nameof(AutoCreateRecordsTask))));
    service.AddTrigger(options => options.ForJob(new JobKey(nameof(AutoCreateRecordsTask))).WithIdentity($"{nameof(AutoCreateRecordsTask)}-trigger").WithCronSchedule(builder.Configuration[Constants.AutoCreateRecordsTaskCron]));
});

builder.Services.AddQuartzHostedService(service => service.WaitForJobsToComplete = true);


// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{ }

app.UseCors("DefaultPolicy");

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.UseDeveloperExceptionPage();
app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseGraphQL<ISchema>();

app.UseGraphQLAltair();
app.UseExceptionHandler("/error");

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";
    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

using var scope = app.Services.CreateScope();
var migrationService = app.Services.GetRequiredService<IMigrationRunner>();
migrationService.MigrateUp();

app.Run();