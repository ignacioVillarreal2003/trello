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

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Team>> GetTeam(long id)
    {
        var team = await _teamService.GetTeamByIdAsync(id);
        if (team == null)
        {
            return NotFound();
        }

        return team;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Team>>> GetTeams()
    {
        return await _teamService.GetTeamsAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddTeam(TeamDto team)
    {
        var result = await _teamService.AddTeamAsync(team);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteTeam(long id)
    {
        var result = await _teamService.DeleteTeamAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateTeam(long id, TeamDto team)
    {
        var result = await _teamService.UpdateTeamAsync(id, team);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}