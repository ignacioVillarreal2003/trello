using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class UserTeamRepository : IUserTeamRepository
{
    private readonly AppDbContext _context;
    
    public UserTeamRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<bool> AddUserTeamAsync(UserTeam userTeam)
    {
        _context.UserTeams.Add(userTeam);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteUserTeamAsync(long teamId, string userEmail)
    {
        var userTeam = await _context.UserTeams
            .FirstOrDefaultAsync(ut => ut.TeamId == teamId && ut.UserEmail == userEmail);
        if (userTeam == null)
        {
            return false;
        }

        _context.UserTeams.Remove(userTeam);
        return await _context.SaveChangesAsync() > 0;
    }
}