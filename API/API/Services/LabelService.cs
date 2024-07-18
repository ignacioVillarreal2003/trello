using API.DTO.Label;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class LabelService
{
    private readonly ILabelRepository _labelRepository;

    public LabelService(ILabelRepository labelRepository)
    {
        _labelRepository = labelRepository;
    }

    public async Task<Label> GetLabelAsync(string labelTitle, string color)
    {
        return await _labelRepository.GetLabelAsync(labelTitle, color);
    }

    public async Task<List<Label>> GetLabelsAsync()
    {
        return await _labelRepository.GetLabelsAsync();
    }

    public async Task<bool> AddLabelAsync(LabelDto label)
    {
        Label l = new Label();
        l.LabelTitle = label.LabelTitle;
        l.Color = label.Color;
        
        return await _labelRepository.AddLabelAsync(l);
    }

    public async Task<bool> DeleteLabelAsync(string labelTitle, string color)
    {
        return await _labelRepository.DeleteLabelAsync(labelTitle, color);
    }
}