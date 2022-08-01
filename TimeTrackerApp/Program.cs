using GraphQL.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.MsSql.Repositories;
using TimeTrackerApp.GraphQL.GraphQLSchema;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

Environment.SetEnvironmentVariable("JWT_TOKEN_ISSUER", "iss");
Environment.SetEnvironmentVariable("JWT_TOKEN_AUDIENCE", "aud");
Environment.SetEnvironmentVariable("JWT_SECRET_KEY", "keASDASFDASFASDFASFDASDDASDy");

string connectionString = builder.Configuration.GetConnectionString("MsSqlConnection");

builder.Services.AddSingleton<IAuthenticationTokenRepository>(provider => new AuthenticationTokenRepository(connectionString));
builder.Services.AddSingleton<IRecordRepository>(provider => new RecordRepository(connectionString));
builder.Services.AddSingleton<IUserRepository>(provider => new UserRepository(connectionString));
builder.Services.AddSingleton<IVacationRequestRepository>(provider => new VacationRequestRepository(connectionString));

// Add services to the container.

builder.Services.AddControllersWithViews();

// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
});

builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("JWT_TOKEN_ISSUER"),
        ValidAudience = Environment.GetEnvironmentVariable("JWT_TOKEN_AUDIENCE"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")))
    };
    options.SaveToken = true;
});

builder.Services.AddCors(
    builder => {
        builder.AddDefaultPolicy(option =>
        {
            option.AllowAnyOrigin();
            option.AllowAnyMethod();
            option.AllowAnyHeader();
        });
    }
);

builder.Services.AddScoped<AppSchema>();

builder.Services
    .AddGraphQL(options =>
    {
        options.EnableMetrics = true;
    })
    .AddSystemTextJson()
    .AddGraphTypes(typeof(AppSchema), ServiceLifetime.Scoped);

//builder.Services.AddControllers()
//    .AddNewtonsoftJson(o => o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{ }
app.UseDeveloperExceptionPage();
app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseAuthentication();
app.UseCors(x => x
         .AllowAnyOrigin()
         .AllowAnyMethod()
         .AllowAnyHeader());

app.MapControllers();


app.UseGraphQL<AppSchema>();

app.UseGraphQLAltair();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";
    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

app.Run();