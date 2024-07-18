using API.Models;

namespace API.Interfaces.Repositories;

public interface ILabelRepository
{
    Task<Label> GetLabelAsync(string labelTitle, string color);
    Task<List<Label>> GetLabelsAsync();
    Task<bool> AddLabelAsync(Label label);
    Task<bool> DeleteLabelAsync(string labelTitle, string color);
}