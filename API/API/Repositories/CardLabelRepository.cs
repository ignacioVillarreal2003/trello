using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;
using ApiLabel = API.Models.Label;

namespace API.Repository;

public class CardLabelRepository : ICardLabelRepository
{
    private readonly AppDbContext _context;
    
    public CardLabelRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<ApiLabel>> GetCardLabelAsync(long cardId)
    {
        var labels = await _context.CardLabels
            .Where(cl => cl.CardId == cardId)
            .Join(_context.Labels,
                cardLabel => new { cardLabel.LabelTitle, cardLabel.Color },
                label => new { label.LabelTitle, label.Color },
                (cardLabel, label) => label)
            .ToListAsync();

        return labels;
    }
    
    public async Task<bool> AddCardLabelAsync(CardLabel cardLabel)
    {
        _context.CardLabels.Add(cardLabel);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteCardLabelAsync(long cardId, string labelTitle, string color)
    {
        var cardLabel = await _context.CardLabels.FindAsync(cardId, labelTitle, color);
        if (cardLabel == null)
        {
            return false;
        }

        _context.CardLabels.Remove(cardLabel);
        return await _context.SaveChangesAsync() > 0;
    }
}