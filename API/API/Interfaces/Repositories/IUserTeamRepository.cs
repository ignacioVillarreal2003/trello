using API.Models;

namespace API.Interfaces.Repositories;

public interface IUserTeamRepository
{
    Task<List<Team>> GetUserTeamsAsync(string userEmail);
    Task<bool> AddUserTeamAsync(UserTeam userTeam);
    Task<bool> DeleteUserTeamAsync(string teamName, string userEmail);
}