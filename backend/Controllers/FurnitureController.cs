using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ARSpaces.Models;

namespace ARSpaces.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FurnitureController : ControllerBase
{
    private readonly ARSpacesContext _context;
    private readonly ILogger<FurnitureController> _logger;

    public FurnitureController(ARSpacesContext context, ILogger<FurnitureController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Furniture>>> GetFurniture()
    {
        _logger.LogInformation("Getting all furniture items");
        return await _context.Furniture.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Furniture>> GetFurniture(int id)
    {
        _logger.LogInformation("Getting furniture item {Id}", id);
        var furniture = await _context.Furniture.FindAsync(id);

        if (furniture == null)
        {
            return NotFound();
        }

        return furniture;
    }
}
