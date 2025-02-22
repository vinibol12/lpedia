using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FurniFit.Services;

namespace FurniFit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageGenerationController : ControllerBase
    {
        private readonly IImageGenerationService _imageGenerationService;

        public ImageGenerationController(IImageGenerationService imageGenerationService)
        {
            _imageGenerationService = imageGenerationService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateImage([FromBody] GenerateImageRequest request)
        {
            var imageUrl = await _imageGenerationService.GenerateFurnitureInRoomImage(
                request.RoomImageUrl,
                request.FurnitureDescription,
                request.SelectionArea
            );

            return Ok(new { imageUrl });
        }
    }

    public class GenerateImageRequest
    {
        public string RoomImageUrl { get; set; }
        public string FurnitureDescription { get; set; }
        public string SelectionArea { get; set; }
    }
}
