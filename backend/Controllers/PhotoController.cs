using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using System.Text.RegularExpressions;

namespace ARSpaces.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PhotoController : ControllerBase
{
    private readonly BlobServiceClient _blobServiceClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<PhotoController> _logger;

    public PhotoController(
        BlobServiceClient blobServiceClient,
        IConfiguration configuration,
        ILogger<PhotoController> logger)
    {
        _blobServiceClient = blobServiceClient;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> UploadPhoto(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

        // Validate file type
        var allowedTypes = new[] { "image/jpeg", "image/png" };
        if (!allowedTypes.Contains(file.ContentType.ToLower()))
        {
            return BadRequest("Invalid file type. Only JPEG and PNG are allowed.");
        }

        // Validate file size (5MB max)
        if (file.Length > 5 * 1024 * 1024)
        {
            return BadRequest("File size exceeds 5MB limit.");
        }

        try
        {
            var containerName = _configuration["AzureStorage:ContainerName"];
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();

            // Generate a unique filename
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var blobClient = containerClient.GetBlobClient(fileName);

            await using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, true);

            _logger.LogInformation("Successfully uploaded photo: {FileName}", fileName);
            return Ok(new { url = blobClient.Uri.ToString() });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading photo");
            return StatusCode(500, "Error uploading photo");
        }
    }
}
