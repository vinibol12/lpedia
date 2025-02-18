using Microsoft.AspNetCore.Mvc;

namespace Lpedia.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "This message is coming from the Home Controller in the .NET App" });
        }
    }
}
