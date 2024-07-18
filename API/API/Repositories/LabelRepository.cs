using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class LabelRepository : ILabelRepository
{
    private readonly AppDbContext _context;

    public LabelRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Label> GetLabelAsync(string labelTitle, string color)
    {
        return await _context.Labels.FindAsync(labelTitle, color);
    }

    public async Task<List<Label>> GetLabelsAsync()
    {
        return await _context.Labels.ToListAsync();
    }

    public async Task<bool> AddLabelAsync(Label label)
    {
        _context.Labels.Add(label);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteLabelAsync(string labelTitle, string color)
    {
        var comment = await _context.Labels.FindAsync(labelTitle, color);
        if (comment == null)
        {
            return false;
        }
        
        _context.Labels.Remove(comment);
        return await _context.SaveChangesAsync() > 0;
    }
}