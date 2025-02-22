using Serilog;
using Serilog.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Azure.Storage.Blobs;
using FurniFit.Models;
using FurniFit.Services;
using FurniFit.Data;
using OpenAI.Extensions;
using Microsoft.AspNetCore.Server.Kestrel.Core;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/furnifit.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Configure Kestrel
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(80); // HTTP
    serverOptions.ListenAnyIP(443, listenOptions => // HTTPS
    {
        listenOptions.UseHttps();
    });
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "FurniFit API", Version = "v1" });
});
builder.Services.AddScoped<IImageGenerationService, ImageGenerationService>();

// Configure OpenAI
var openAiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

if (string.IsNullOrEmpty(openAiKey))
{
    // Load configuration from local.settings.json
    var configBuilder = new ConfigurationBuilder()
        .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true);
    var configuration = configBuilder.Build();
    
    // if this error happens it means that you don't have a local.settings.json with the OpenAI API key in the project. 
    // Add it using the open API key. It's done like this to ensure we don't check in the API key to the repository.
    openAiKey = configuration["OpenAI:ApiKey"] ?? 
        throw new InvalidOperationException("OpenAI API key not found in environment variables or configuration.");
}

builder.Services.AddOpenAIService(settings => { 
    settings.ApiKey = openAiKey;
});

// Configure SQLite
builder.Services.AddDbContext<FurniFitContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configure Azure Blob Storage
builder.Services.AddSingleton(x => 
    new BlobServiceClient(builder.Configuration.GetConnectionString("AzureStorage")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "FurniFit API V1");
        c.RoutePrefix = "swagger";
    });
    
    // Ensure database is created
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<FurniFitContext>();
        context.Database.EnsureCreated();
    }
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Add a default route
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
