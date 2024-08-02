using System.Reflection.Emit;
using API.DTO.CardLabel;
using API.DTO.Team;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using ApiLabel = API.Models.Label;

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
    
    [HttpGet("{cardId}")]
    [Authorize]
    public async Task<ActionResult<List<ApiLabel>>> GetCardLabel(long cardId)
    {
        var labels = await _cardLabelService.GetCardLabelAsync(cardId);

        return Ok( new {labels} );
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
    
    [HttpDelete("{cardId}-{labelTitle}-{color}")]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteCardLabel(long cardId, string labelTitle, string color)
    {
        var result = await _cardLabelService.DeleteCardLabelAsync(cardId, labelTitle, color);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}