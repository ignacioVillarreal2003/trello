using API.DTO.Team;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class TeamService
{
    private readonly ITeamRepository _teamRepository;

    public TeamService(ITeamRepository teamRepository)
    {
        _teamRepository = teamRepository;
    }

    public async Task<bool> AddTeamAsync(TeamDto team)
    {
        Team t = new Team();
        t.TeamName = team.TeamName;
        t.Theme = team.Theme;
        
        return await _teamRepository.AddTeamAsync(t);
    }

    public async Task<bool> DeleteTeamAsync(string teamName)
    {
        return await _teamRepository.DeleteTeamAsync(teamName);
    }

    public async Task<bool> UpdateTeamAsync(string teamName, UpdateTeamDto team)
    {
        Team t = await _teamRepository.GetTeamAsync(teamName);
        if (t == null)
        {
            return false;
        }

        if (team.Theme.Length > 0)
        {
            t.Theme = team.Theme;
        }

        return await _teamRepository.UpdateTeamAsync(t);
    }
}