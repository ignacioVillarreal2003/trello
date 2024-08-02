using API.Models;

namespace API.Interfaces.Repositories;

public interface ICardUserRepository
{
    Task<List<User>> GetCardUserAsync(long cardId);
    Task<bool> AddCardUserAsync(CardUser cardUser);
    Task<bool> DeleteCardUserAsync(long cardId, string userMail);
}