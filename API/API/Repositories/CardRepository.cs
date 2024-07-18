using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class CardRepository : ICardRepository
{
    private readonly AppDbContext _context;
    
    public CardRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<Card> GetCardByIdAsync(long id)
    {
        return await _context.Cards.FindAsync(id);
    }

    public async Task<List<Card>> GetCardByListIdAsync(long listId)
    {
        return await _context.Cards.Where(c => c.ListId == listId).ToListAsync(); 
    } 

    public async Task<List<Card>> GetCardsAsync()
    {
        return await _context.Cards.ToListAsync();
    }

    public async Task<bool> AddCardAsync(Card card)
    {
        _context.Cards.Add(card);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteCardAsync(long id)
    {
        var card = await _context.Cards.FindAsync(id);
        if (card == null)
        {
            return false;
        }

        _context.Cards.Remove(card);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateCardAsync(Card card)
    {
        _context.Cards.Update(card);
        return await _context.SaveChangesAsync() > 0;
    }
}