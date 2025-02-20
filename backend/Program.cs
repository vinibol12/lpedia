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
    .MinimumLevel.Verbose() // Set the minimum level to Verbose
    .MinimumLevel.Override("Microsoft", LogEventLevel.Verbose)
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
        policyBuilder
            .SetIsOriginAllowed(origin =>
            {
                var allowedOrigins = builder.Environment.IsDevelopment()
                    ? new[] { "http://localhost:3000", "http://localhost:3001" }
                    : new[] { "https://salmon-ocean-04da24500.4.azurestaticapps.net" };
                
                return allowedOrigins.Contains(origin);
            })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Log request headers middleware
app.Use(async (context, next) =>
{
    Console.WriteLine("Request Headers LOGGING:");
    foreach (var header in context.Request.Headers)
    {
        Console.WriteLine($"{header.Key}: {header.Value}");
    }
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

// Important: UseCors must be called before UseHttpsRedirection and other middleware that might handle the response
app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run("http://0.0.0.0:8080"); // Ensure the application listens on port 8080
