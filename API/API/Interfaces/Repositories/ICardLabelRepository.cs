using API.Models;

namespace API.Interfaces.Repositories;

public interface ICardLabelRepository
{
    Task<bool> AddCardLabelAsync(CardLabel cardLabel);
    Task<bool> DeleteCardLabelAsync(long cardId, string labelTitle, string color);
}