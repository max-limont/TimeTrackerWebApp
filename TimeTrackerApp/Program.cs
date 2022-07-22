using GraphQL.Server;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.MsSql.Repositories;
using TimeTrackerApp.GraphQL.GraphQLSchema;

var builder = WebApplication.CreateBuilder(args);

string conn = builder.Configuration.GetConnectionString("MsSqlConnection");

//builder.Services.AddSingleton<IAuthenticationTokenRepository>(provider => AuthenticationTokenRepository(conn));
//builder.Services.AddSingleton<IRecordRepository>(provider => RecordRepository(conn));
//builder.Services.AddSingleton<IUserRepository>(provider => UserRepository(conn));
//builder.Services.AddSingleton<IVacationRequestRepository>(provider => VacationRequestRepository(conn));

// Add services to the container.

builder.Services.AddControllersWithViews();

// In production, the React files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
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