using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FurniFit.Data;
using FurniFit.Models;
using OpenAI.Interfaces;
using OpenAI.ObjectModels.RequestModels;
using System.Text.Json;

namespace FurniFit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SuggestionsController : ControllerBase
    {
        private readonly FurniFitContext _context;
        private readonly IOpenAIService _openAiService;

        public SuggestionsController(FurniFitContext context, IOpenAIService openAiService)
        {
            _context = context;
            _openAiService = openAiService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSuggestions(int id)
        {
            var furniture = await _context.Furniture.FindAsync(id);
            if (furniture == null)
            {
                return NotFound();
            }

            var completionResult = await _openAiService.ChatCompletion.CreateCompletion(new ChatCompletionCreateRequest
            {
                Messages = new List<ChatMessage>
                {
                    ChatMessage.FromSystem("You are a furniture design expert. Suggest 3 complementary furniture items that would go well with the given piece. Respond in JSON format with an array of suggestions, each containing 'type' and 'description'."),
                    ChatMessage.FromUser($"Suggest complementary furniture for a {furniture.Category} in the style of {furniture.Name}")
                },
                Model = OpenAI.ObjectModels.Models.Gpt_3_5_Turbo
            });

            if (completionResult.Successful)
            {
                return Ok(completionResult.Choices.First().Message.Content);
            }

            return BadRequest("Failed to generate suggestions");
        }
    }
}
