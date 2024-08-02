using API.DTO.Label;
using API.Interfaces.Repositories;
using API.Models;
using ApiLabel = API.Models.Label;

namespace API.Services;

public class LabelService
{
    private readonly ILabelRepository _labelRepository;

    public LabelService(ILabelRepository labelRepository)
    {
        _labelRepository = labelRepository;
    }

    public async Task<List<ApiLabel>> GetLabelsAsync()
    {
        return await _labelRepository.GetLabelsAsync();
    }

    public async Task<bool> AddLabelAsync(LabelDto label)
    {
        ApiLabel l = new ApiLabel();
        l.LabelTitle = label.LabelTitle;
        l.Color = label.Color;
        
        return await _labelRepository.AddLabelAsync(l);
    }

    public async Task<bool> DeleteLabelAsync(string labelTitle, string color)
    {
        return await _labelRepository.DeleteLabelAsync(labelTitle, color);
    }
}