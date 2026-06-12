using Microsoft.AspNetCore.Mvc;
using WebApplication1.Business;
using WebApplication1.Dtos;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")] 
    public IActionResult Login([FromBody] LoginDto dto)
    {
        try
        {
            var token = _authService.Login(dto);
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}