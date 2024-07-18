using API.DTO.CardLabel;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class CardLabelService
{
    private readonly ICardLabelRepository _cardLabelRepository;

    public CardLabelService(ICardLabelRepository cardLabelRepository)
    {
        _cardLabelRepository = cardLabelRepository;
    }
    
    public async Task<bool> AddCardLabelAsync(CardLabelDto cardLabel)
    {
        CardLabel cL = new CardLabel();
        cL.LabelTitle = cardLabel.LabelTitle;
        cL.CardId = cardLabel.CardId;
        cL.Color = cardLabel.Color;
        
        return await _cardLabelRepository.AddCardLabelAsync(cL);
    }
    
    public async Task<bool> DeleteCardLabelAsync(CardLabelDto cardLabel)
    {
        return await _cardLabelRepository.DeleteCardLabelAsync(cardLabel.CardId, cardLabel.LabelTitle, cardLabel.Color);
    }
}