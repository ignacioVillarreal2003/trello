using API.DTO.CardLabel;
using API.DTO.Team;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class CardLabelController : ControllerBase
{
    private readonly CardLabelService _cardLabelService;

    public CardLabelController(CardLabelService cardLabelService)
    {
        _cardLabelService = cardLabelService;
    }
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddCardLabel(CardLabelDto cardLabel)
    {
        var result = await _cardLabelService.AddCardLabelAsync(cardLabel);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
    
    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteCardLabel(CardLabelDto cardLabel)
    {
        var result = await _cardLabelService.DeleteCardLabelAsync(cardLabel);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}