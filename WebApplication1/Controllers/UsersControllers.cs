using Microsoft.AspNetCore.Mvc;
using WebApplication1.Business;
using WebApplication1.Data;
using WebApplication1.Dtos;

namespace WebApplication1.Controllers;
[ApiController] 
[Route("api/users")] 
public class UsersControllers : ControllerBase
{   
    private readonly IUserService _userService;

    public UsersControllers(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        var users = _userService.GetAllUsers();
        return Ok(users);
    }
    [HttpGet("{id}")]
    public IActionResult GetUserById(int id)
    {
        var user = _userService.GetUserById(id);
        if(user is null)
        {
            return NotFound("Böyle Bir Kullanıcı Mevcut değil");
        }
        return Ok(user);
    }
    [HttpPost]
    public IActionResult CreateUser([FromBody]CreateUserDto dto)
    {
        try
        {
            var newUser = _userService.CreateUser(dto);
        return Ok(newUser);
        }
        catch (Exception ex)
        {
            return BadRequest(new {message=ex.Message});
        }
    }
    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, UpdateUserDto dto)
    {
        var updatedUser = _userService.UpdateUser(id,dto);

          if (!updatedUser)
        {
            return NotFound($"{id} numaralı kullanıcı bulunamadı");
        }
        return NoContent();
    }
    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        var deletedUser = _userService.DeleteUser(id);
        if (!deletedUser)
        {
            return NotFound($"{id} numaralı Kullanıcı bulunamadı");
        }
        return NoContent();
    }
}