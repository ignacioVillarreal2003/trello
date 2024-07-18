using API.DTO.Team;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class UserTeamService
{
    private readonly IUserTeamRepository _userTeamRepository;
    private readonly ITeamRepository _teamRepository;

    public UserTeamService(IUserTeamRepository userTeamRepository, ITeamRepository teamRepository)
    {
        _userTeamRepository = userTeamRepository;
        _teamRepository = teamRepository;
    }
    
    public async Task<bool> AddUserTeamAsync(UserTeamDto userTeam)
    {
        Team t = await _teamRepository.GetTeamByIdAsync(userTeam.TeamId);
        if (t == null)
        {
            return false;
        }

        bool verified = BCrypt.Net.BCrypt.Verify(userTeam.TeamPassword, t.TeamPassword);
        if (!verified)
        {
            return false;
        }
        
        UserTeam uT = new UserTeam();
        uT.TeamId = userTeam.TeamId;
        uT.UserEmail = userTeam.UserEmail;
        
        return await _userTeamRepository.AddUserTeamAsync(uT);
    }
    
    public async Task<bool> DeleteUserTeamAsync(DeleteUserTeamDto userTeam)
    {
        return await _userTeamRepository.DeleteUserTeamAsync(userTeam.TeamId, userTeam.UserEmail);
    }
}