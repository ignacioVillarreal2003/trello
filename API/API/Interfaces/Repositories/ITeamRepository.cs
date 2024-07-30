using API.Models;

namespace API.Interfaces.Repositories;

public interface ITeamRepository
{
    Task<Team> GetTeamAsync(string teamName);
    Task<bool> AddTeamAsync(Team team);
    Task<bool> DeleteTeamAsync(string teamName);
    Task<bool> UpdateTeamAsync(Team team);
}