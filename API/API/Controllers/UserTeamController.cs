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
    
    [HttpGet("{userEmail}")]
    [Authorize]
    public async Task<ActionResult<List<Team>>> GetUserTeams(string userEmail)
    {
        var teams = await _userTeamService.GetUserTeamsAsync(userEmail);
        
        return Ok(new { teams });
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
    
    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteUserTeam(UserTeamDto userTeam)
    {
        var result = await _userTeamService.DeleteUserTeamAsync(userTeam);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    } // VER UTILIDAD ---------
}