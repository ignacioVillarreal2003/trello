using API.Models;

namespace API.Interfaces.Repositories;

public interface ITeamRepository
{
    Task<Team> GetTeamByIdAsync(long id);
    Task<List<Team>> GetTeamsAsync();
    Task<bool> AddTeamAsync(Team team);
    Task<bool> DeleteTeamAsync(long id);
    Task<bool> UpdateTeamAsync(Team team);
}