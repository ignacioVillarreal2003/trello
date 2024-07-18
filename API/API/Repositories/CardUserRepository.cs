using API.Context;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Repository;

public class CardUserRepository : ICardUserRepository
{
    private readonly AppDbContext _context;
    
    public CardUserRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<bool> AddCardUserAsync(CardUser cardUser)
    {
        _context.CardUsers.Add(cardUser);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteCardUserAsync(long cardId, string userMail)
    {
        var cardUser = await _context.CardUsers.FindAsync(cardId, userMail);
        if (cardUser == null)
        {
            return false;
        }

        _context.CardUsers.Remove(cardUser);
        return await _context.SaveChangesAsync() > 0;
    }
}