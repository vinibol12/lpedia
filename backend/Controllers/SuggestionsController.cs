using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using FurniFit.Models;

namespace FurniFit.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuggestionsController : ControllerBase
{
    private readonly FurniFitContext _context;
    private readonly IConfiguration _configuration;
    private readonly ILogger<SuggestionsController> _logger;

    public SuggestionsController(
        FurniFitContext context,
        IConfiguration configuration,
        ILogger<SuggestionsController> logger)
    {
        _context = context;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSuggestions(int id)
    {
        var furniture = await _context.Furniture.FindAsync(id);
        if (furniture == null)
        {
            return NotFound();
        }

        try
        {
            var api = new OpenAIAPI(_configuration["OpenAI:ApiKey"]);
            var chat = api.Chat.CreateConversation();
            
            chat.AppendSystemMessage("You are a furniture design expert. Suggest 3 complementary furniture items that would go well with the given piece. Respond in JSON format with an array of suggestions, each containing 'type' and 'description'.");
            chat.AppendUserInput($"Suggest complementary furniture for a {furniture.Type} in the style of {furniture.Name}");

            var response = await chat.GetResponseFromChatbotAsync();
            
            _logger.LogInformation("Generated suggestions for furniture {Id}", id);
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating suggestions for furniture {Id}", id);
            return StatusCode(500, "Error generating suggestions");
        }
    }
}
