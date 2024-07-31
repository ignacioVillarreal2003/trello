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
    
    public async Task<List<Team>> GetUserTeamsByUserAsync(string userEmail)
    {
        var teams = await _context.UserTeams
            .Where(ut => ut.UserEmail == userEmail)
            .Join(_context.Teams,
                userTeam => userTeam.TeamName,
                team => team.TeamName,
                (userTeam, team) => team)
            .ToListAsync();

        return teams;
    }
    
    public async Task<List<User>> GetUserTeamsByTeamAsync(string teamName)
    {
        var users = await _context.UserTeams
            .Where(ut => ut.TeamName == teamName)
            .Join(_context.Users,
                userTeam => userTeam.UserEmail,
                user => user.Email,
                (userTeam, user) => user)
            .ToListAsync();

        return users;
    }
    
    public async Task<bool> AddUserTeamAsync(UserTeam userTeam)
    {
        _context.UserTeams.Add(userTeam);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteUserTeamAsync(string teamName, string userEmail)
    {
        var userTeam = await _context.UserTeams
            .FirstOrDefaultAsync(ut => ut.TeamName == teamName && ut.UserEmail == userEmail);
        if (userTeam == null)
        {
            return false;
        }

        _context.UserTeams.Remove(userTeam);
        return await _context.SaveChangesAsync() > 0;
    }
}