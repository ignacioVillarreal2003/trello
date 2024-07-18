using API.Models;

namespace API.Interfaces.Repositories;

public interface IUserTeamRepository
{
    Task<bool> AddUserTeamAsync(UserTeam userTeam);
    Task<bool> DeleteUserTeamAsync(long teamId, string userEmail);
}