using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using OpenAI.ObjectModels.RequestModels;
using OpenAI.ObjectModels;
using OpenAI.Interfaces;

namespace FurniFit.Services
{
    public interface IImageGenerationService
    {
        Task<string> GenerateFurnitureInRoomImage(string roomImageUrl, string furnitureDescription, string selectionArea);
    }

    public class ImageGenerationService : IImageGenerationService
    {
        private readonly IOpenAIService _openAiService;
        private readonly IConfiguration _configuration;

        public ImageGenerationService(IConfiguration configuration, IOpenAIService openAiService)
        {
            _configuration = configuration;
            _openAiService = openAiService;
        }

        public async Task<string> GenerateFurnitureInRoomImage(string roomImageUrl, string furnitureDescription, string selectionArea)
        {
            try
            {
                var prompt = $"Edit this room photo to add a {furnitureDescription} in the marked area at {selectionArea}. " +
                           $"Make it look natural and match the room's lighting and perspective. " +
                           $"The furniture should be perfectly integrated into the scene.";

                var imageResult = await _openAiService.Image.CreateImage(new ImageCreateRequest
                {
                    Prompt = prompt,
                    N = 1,
                    Size = StaticValues.ImageStatics.Size.Size1024,
                    ResponseFormat = StaticValues.ImageStatics.ResponseFormat.Url
                });

                if (imageResult.Successful)
                {
                    return imageResult.Results[0].Url;
                }

                throw new ApplicationException($"Image generation failed: {imageResult.Error?.Message}");
            }
            catch (Exception ex)
            {
                throw new ApplicationException($"Failed to generate image: {ex.Message}", ex);
            }
        }
    }
}
