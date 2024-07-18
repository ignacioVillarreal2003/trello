using API.Context;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Repository;

public class CardLabelRepository : ICardLabelRepository
{
    private readonly AppDbContext _context;
    
    public CardLabelRepository(AppDbContext context)
    {
        _context = context;
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