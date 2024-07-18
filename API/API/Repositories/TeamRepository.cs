using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class TeamRepository : ITeamRepository
{
    private readonly AppDbContext _context;

    public TeamRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Team> GetTeamByIdAsync(long id)
    {
        return await _context.Teams.FindAsync(id);
    }

    public async Task<List<Team>> GetTeamsAsync()
    {
        return await _context.Teams.ToListAsync();
    }

    public async Task<bool> AddTeamAsync(Team team)
    {
        _context.Teams.Add(team);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteTeamAsync(long id)
    {
        var team = await _context.Teams.FindAsync(id);
        if (team == null)
        {
            return false;
        }

        _context.Teams.Remove(team);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateTeamAsync(Team team)
    {
        _context.Teams.Update(team);
        return await _context.SaveChangesAsync() > 0;
    }
}