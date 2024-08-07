using API.DTO.Card;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class CardService
{
    private readonly ICardRepository _cardRepository;

    public CardService(ICardRepository cardRepository)
    {
        _cardRepository = cardRepository;
    }
    
    public async Task<List<Card>> GetCardsAsync(long id)
    {
        return await _cardRepository.GetCardByListIdAsync(id);
    }

    public async Task<bool> AddCardAsync(CardDto card)
    {
        Card c = new Card();
        c.ListId = card.ListId;
        c.Description = card.Description;
        c.Start = card.Start;
        c.End = card.End;
        c.CardTitle = card.CardTitle;
            
        return await _cardRepository.AddCardAsync(c);
    }

    public async Task<bool> DeleteCardAsync(long id)
    {
        return await _cardRepository.DeleteCardAsync(id);
    }

    public async Task<bool> UpdateCardAsync(long id, UpdateCardDto card)
    {
        Card c = await _cardRepository.GetCardByIdAsync(id);
        if (c == null)
        {
            return false;
        }

        if (card.CardTitle.Length > 0)
        {
            c.CardTitle = card.CardTitle;
        }
        
        if (card.Description.Length > 0)
        {
            c.Description = card.Description;
        }
        
        if (card.End != null)
        {
            c.End = card.End;
        }
        
        return await _cardRepository.UpdateCardAsync(c);
    }
}