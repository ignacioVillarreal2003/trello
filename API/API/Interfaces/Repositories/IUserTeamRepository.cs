using API.Models;

namespace API.Interfaces.Repositories;

public interface IUserTeamRepository
{
    Task<List<Team>> GetUserTeamsByUserAsync(string userEmail);
    Task<List<User>> GetUserTeamsByTeamAsync(string teamName);

    Task<bool> AddUserTeamAsync(UserTeam userTeam);
    Task<bool> DeleteUserTeamAsync(string teamName, string userEmail);
}