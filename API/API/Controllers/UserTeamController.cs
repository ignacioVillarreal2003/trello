using API.DTO.Team;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class UserTeamController : ControllerBase
{
    private readonly UserTeamService _userTeamService;

    public UserTeamController(UserTeamService userTeamService)
    {
        _userTeamService = userTeamService;
    }
    
    [HttpGet("user/{userEmail}")]
    [Authorize]
    public async Task<ActionResult<List<Team>>> GetUserTeamsByUser(string userEmail)
    {
        var teams = await _userTeamService.GetUserTeamsByUserAsync(userEmail);
        
        return Ok(new { teams });
    } // FUNCIONA
    
    [HttpGet("team/{teamName}")]
    [Authorize]
    public async Task<ActionResult<List<User>>> GetUserTeamsByTeam(string teamName)
    {
        var users = await _userTeamService.GetUserTeamsByTeamAsync(teamName);
        
        return Ok(new { users });
    } // FUNCIONA
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddUserTeam(UserTeamDto userTeam)
    {
        var result = await _userTeamService.AddUserTeamAsync(userTeam);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    } // FUNCIONA
    
    [HttpDelete("{teamName}-{userEmail}")]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteUserTeam(string teamName, string userEmail)
    {
        var result = await _userTeamService.DeleteUserTeamAsync(teamName, userEmail);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    } // FUNCIONA
}