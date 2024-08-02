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
    
    public async Task<List<User>> GetCardUserAsync(long cardId)
    {
        return await _cardUserRepository.GetCardUserAsync(cardId);
    }
    
    public async Task<bool> AddCardUserAsync(CardUserDto cardUser)
    {
        CardUser cU = new CardUser();
        cU.UserEmail = cardUser.UserEmail;
        cU.CardId = cardUser.CardId;
        
        return await _cardUserRepository.AddCardUserAsync(cU);
    }
    
    public async Task<bool> DeleteCardUserAsync(long cardId, string userEmail)
    {
        return await _cardUserRepository.DeleteCardUserAsync(cardId, userEmail);
    }
}