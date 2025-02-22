using Serilog;
using Serilog.Events;
using Microsoft.EntityFrameworkCore;
using Azure.Storage.Blobs;
using FurniFit.Models;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/furnifit.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllers();

// Configure SQLite
builder.Services.AddDbContext<FurniFitContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Azure Blob Storage
builder.Services.AddSingleton(x => 
    new BlobServiceClient(builder.Configuration["AzureStorage:ConnectionString"]));

// Configure CORS
builder.Services.AddCors(options =>
{
    var environment = builder.Environment.EnvironmentName;
    var allowedOrigins = builder.Environment.IsDevelopment()
        ? new[] { "http://localhost:3000" }
        : new[] { "https://salmon-ocean-04da24500.4.azurestaticapps.net" };
            
    Console.WriteLine($"Configuring CORS - Environment: {environment}");
    Console.WriteLine($"Allowed Origins: {string.Join(", ", allowedOrigins)}");
    
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    // Initialize and seed the database
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<FurniFitContext>();
        context.Database.EnsureCreated();
    }
}

// Important: UseCors must be called before UseHttpsRedirection
app.UseCors();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllers();

// Handle SPA routing - forward all non-API routes to index.html
app.MapFallbackToFile("index.html");

app.Run();
