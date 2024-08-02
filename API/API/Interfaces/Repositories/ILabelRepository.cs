using API.Models;
using ApiLabel = API.Models.Label;

namespace API.Interfaces.Repositories;

public interface ILabelRepository
{
    Task<ApiLabel> GetLabelAsync(string labelTitle, string color);
    Task<List<ApiLabel>> GetLabelsAsync();
    Task<bool> AddLabelAsync(ApiLabel label);
    Task<bool> DeleteLabelAsync(string labelTitle, string color);
}