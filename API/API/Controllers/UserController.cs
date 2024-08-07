using API.DTO;
using API.Interfaces;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IJwt _jwt;
    private readonly UserService _userService;
    
    public UserController(UserService userService, IJwt jwt)
    {
        _userService = userService;
        _jwt = jwt;
    }
    
    [HttpGet("{email}")]
    [Authorize]
    public async Task<ActionResult<User>> GetUser(string email)
    {
        User user = await _userService.GetUserByEmailAsync(email);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(new { user });
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<User>>> GetUsers()
    {
        List<User> users = await _userService.GetUsersAsync();
        
        if (users == null)
        {
            return NotFound();
        }

        return Ok(new { users });
    }

    [HttpDelete("{email}")]
    [Authorize]
    public async Task<IActionResult> DeleteUser(string email)
    {
        bool result = await _userService.DeleteUserAsync(email);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{email}")]
    [Authorize] 
    public async Task<IActionResult> UpdateUser(string email, UpdateUserDto user)
    {
        bool result = await _userService.UpdateUserAsync(email, user);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
    
    [HttpPost("register")]
    public async Task<ActionResult<string>> RegisterUser(UserDto user)
    {
        bool result = await _userService.RegisterUserAsync(user);
        if (!result)
        {
            return BadRequest();
        }

        string token = _jwt.GenerarToken(user.Email);
        return Ok(new { token });
    }
    
    [HttpPost("login")]
    public async Task<ActionResult<string>> LoginUser(LoginUserDto user)
    {
        bool result = await _userService.LoginUserAsync(user);
        if (!result)
        {
            return BadRequest();
        }

        string token = _jwt.GenerarToken(user.Email);
        return Ok(new { token });
    }
}
