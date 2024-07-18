using API.Models;

namespace API.Interfaces.Repositories;

public interface ICardRepository
{
    Task<Card> GetCardByIdAsync(long id);
    Task<List<Card>> GetCardByListIdAsync(long id);
    Task<List<Card>> GetCardsAsync();
    Task<bool> AddCardAsync(Card card);
    Task<bool> DeleteCardAsync(long id);
    Task<bool> UpdateCardAsync(Card card);
}