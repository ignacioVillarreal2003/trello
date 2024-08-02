using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;
using ApiLabel = API.Models.Label;

namespace API.Repository;

public class LabelRepository : ILabelRepository
{
    private readonly AppDbContext _context;

    public LabelRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ApiLabel> GetLabelAsync(string labelTitle, string color)
    {
        return await _context.Labels.FindAsync(labelTitle, color);
    }

    public async Task<List<ApiLabel>> GetLabelsAsync()
    {
        return await _context.Labels.ToListAsync();
    }

    public async Task<bool> AddLabelAsync(ApiLabel label)
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