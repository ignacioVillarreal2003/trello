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

    public async Task<Team> GetTeamAsync(string teamName)
    {
        return await _context.Teams.FindAsync(teamName);
    }

    public async Task<bool> AddTeamAsync(Team team)
    {
        _context.Teams.Add(team);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteTeamAsync(string teamName)
    {
        var team = await _context.Teams.FindAsync(teamName);
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