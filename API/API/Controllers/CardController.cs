using API.DTO.Card;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class CardController : ControllerBase
{
    private readonly CardService _cardService;

    public CardController(CardService cardService)
    {
        _cardService = cardService;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Card>> GetCardById(long id)
    {
        var card = await _cardService.GetCardByIdAsync(id);
        if (card == null)
        {
            return NotFound();
        }

        return card;
    }
    
    [HttpGet("list/{id}")]
    [Authorize]
    public async Task<ActionResult<List<Card>>> GetCardByListId(long id)
    {
        var card = await _cardService.GetCardByListIdAsync(id);
        if (card == null)
        {
            return NotFound();
        }

        return card;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Card>>> GetCards()
    {
        return await _cardService.GetCardsAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddCard(CardDto card)
    {
        var result = await _cardService.AddCardAsync(card);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteCard(long id)
    {
        var result = await _cardService.DeleteCardAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateCard(long id, UpdateCardDto card)
    {
        var result = await _cardService.UpdateCardAsync(id, card);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}