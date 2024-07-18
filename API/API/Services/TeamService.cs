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

    public async Task<Team> GetTeamByIdAsync(long id)
    {
        return await _teamRepository.GetTeamByIdAsync(id);
    }

    public async Task<List<Team>> GetTeamsAsync()
    {
        return await _teamRepository.GetTeamsAsync();
    }

    public async Task<bool> AddTeamAsync(TeamDto team)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(team.TeamPassword);
        
        Team t = new Team();
        t.TeamName = team.TeamName;
        t.OwnerEmail = team.OwnerEmail;
        t.TeamPassword = passwordHash;
        
        return await _teamRepository.AddTeamAsync(t);
    }

    public async Task<bool> DeleteTeamAsync(long id)
    {
        return await _teamRepository.DeleteTeamAsync(id);
    }

    public async Task<bool> UpdateTeamAsync(long id, TeamDto team)
    {
        Team t = await _teamRepository.GetTeamByIdAsync(id);
        if (t == null)
        {
            return false;
        }

        t.TeamName = team.TeamName;
        t.OwnerEmail = team.OwnerEmail;
        t.TeamPassword = team.TeamPassword;

        return await _teamRepository.UpdateTeamAsync(t);
    }
}