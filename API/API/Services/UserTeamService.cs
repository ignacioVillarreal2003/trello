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
    
    public async Task<List<Team>> GetUserTeamsAsync(string userEmail)
    {
        return await _userTeamRepository.GetUserTeamsAsync(userEmail);
    }
    
    public async Task<bool> AddUserTeamAsync(UserTeamDto userTeam)
    {
        Team t = await _teamRepository.GetTeamAsync(userTeam.TeamName);
        if (t == null)
        {
            return false;
        }
        
        UserTeam uT = new UserTeam();
        uT.TeamName = userTeam.TeamName;
        uT.UserEmail = userTeam.UserEmail;
        
        return await _userTeamRepository.AddUserTeamAsync(uT);
    }
    
    public async Task<bool> DeleteUserTeamAsync(UserTeamDto userTeam)
    {
        return await _userTeamRepository.DeleteUserTeamAsync(userTeam.TeamName, userTeam.UserEmail);
    }
}