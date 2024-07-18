using API.DTO.CardUser;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class CardUserService
{
    private readonly ICardUserRepository _cardUserRepository;

    public CardUserService(ICardUserRepository cardUserRepository)
    {
        _cardUserRepository = cardUserRepository;
    }
    
    public async Task<bool> AddCardUserAsync(CardUserDto cardUser)
    {
        CardUser cU = new CardUser();
        cU.UserEmail = cardUser.UserEmail;
        cU.CardId = cardUser.CardId;
        
        return await _cardUserRepository.AddCardUserAsync(cU);
    }
    
    public async Task<bool> DeleteCardUserAsync(CardUserDto cardUser)
    {
        return await _cardUserRepository.DeleteCardUserAsync(cardUser.CardId, cardUser.UserEmail);
    }
}