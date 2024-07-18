using API.DTO.Team;
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
    }
    
    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteUserTeam(DeleteUserTeamDto userTeam)
    {
        var result = await _userTeamService.DeleteUserTeamAsync(userTeam);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}