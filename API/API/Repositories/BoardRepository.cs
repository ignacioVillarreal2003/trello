using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class BoardRepository : IBoardRepository
{
    private readonly AppDbContext _context;
    
    public BoardRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Board> GetBoardByIdAsync(long id)
    {
        return await _context.Boards.FindAsync(id);
    }
    
    public async Task<List<Board>> GetBoardsByTeamIdAsync(long teamId)
    {
        return await _context.Boards.Where(b => b.TeamId == teamId).ToListAsync(); 
    }

    public async Task<List<Board>> GetBoardsAsync()
    {
        return await _context.Boards.ToListAsync();
    }

    public async Task<bool> AddBoardAsync(Board board)
    {
        _context.Boards.Add(board);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteBoardAsync(long id)
    {
        var board = await _context.Boards.FindAsync(id);
        if (board == null)
        {
            return false;
        }

        _context.Boards.Remove(board);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateBoardAsync(Board board)
    {
        _context.Boards.Update(board);
        return await _context.SaveChangesAsync() > 0;
    }
}