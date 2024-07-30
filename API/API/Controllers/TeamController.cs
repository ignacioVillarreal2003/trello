using API.DTO.Team;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class TeamController : ControllerBase
{
    private readonly TeamService _teamService;

    public TeamController(TeamService teamService)
    {
        _teamService = teamService;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddTeam(TeamDto team) // FUNCIONA
    {
        var result = await _teamService.AddTeamAsync(team);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{teamName}")]
    [Authorize]
    public async Task<IActionResult> DeleteTeam(string teamName)
    {
        var result = await _teamService.DeleteTeamAsync(teamName);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    } //FUNCIONA

    [HttpPut("{teamName}")]
    [Authorize]
    public async Task<IActionResult> UpdateTeam(string teamName, UpdateTeamDto team)
    {
        var result = await _teamService.UpdateTeamAsync(teamName, team);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    } // FUNCIONA
}