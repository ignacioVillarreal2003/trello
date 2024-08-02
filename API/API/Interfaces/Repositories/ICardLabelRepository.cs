using API.Models;
using ApiLabel = API.Models.Label;

namespace API.Interfaces.Repositories;

public interface ICardLabelRepository
{
    Task<List<ApiLabel>> GetCardLabelAsync(long cardId);
    Task<bool> AddCardLabelAsync(CardLabel cardLabel);
    Task<bool> DeleteCardLabelAsync(long cardId, string labelTitle, string color);
}