using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "wwwroot",
    ContentRootPath = AppContext.BaseDirectory,
    ApplicationName = typeof(Program).Assembly.FullName,
    EnvironmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Development"
});

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/app.log", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    Console.WriteLine($"Current Environment: {builder.Environment.EnvironmentName}");
    options.AddDefaultPolicy(policyBuilder =>
    {
        policyBuilder.WithOrigins(builder.Environment.IsDevelopment() 
            ? new[] { "http://localhost:3000", "http://localhost:3001" } // Allow the frontend origins in development
            : new[] { "https://salmon-ocean-04da24500.4.azurestaticapps.net" }) // Allow the production origin
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Log CORS headers middleware
app.Use(async (context, next) =>
{
    await next();
    var corsHeaders = context.Response.Headers["Access-Control-Allow-Origin"];
    Console.WriteLine($"CORS Headers: {corsHeaders}");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(); // Enable CORS

app.MapControllers();

app.Run("http://0.0.0.0:8080"); // Ensure the application listens on port 8080
