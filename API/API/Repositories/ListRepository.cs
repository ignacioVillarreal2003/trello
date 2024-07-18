using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class ListRepository : IListRepository
{
    private readonly AppDbContext _context;
    
    public ListRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List> GetListByIdAsync(long id)
    {
        return await _context.Lists.FindAsync(id);
    }
    
    public async Task<List<List>> GetListByBoardIdAsync(long boardId)
    {
        return await _context.Lists.Where(b => b.BoardId == boardId).ToListAsync(); 
    }

    public async Task<List<List>> GetListsAsync()
    {
        return await _context.Lists.ToListAsync();
    }

    public async Task<bool> AddListAsync(List list)
    {
        _context.Lists.Add(list);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteListAsync(long id)
    {
        var list = await _context.Lists.FindAsync(id);
        if (list == null)
        {
            return false;
        }

        _context.Lists.Remove(list);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateListAsync(List list)
    {
        _context.Lists.Update(list);
        return await _context.SaveChangesAsync() > 0;
    }
}