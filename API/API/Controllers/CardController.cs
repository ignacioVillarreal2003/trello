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
    public async Task<ActionResult<List<Card>>> GetCards(long id)
    {
        List<Card> cards = await _cardService.GetCardsAsync(id);
        if (cards == null)
        {
            return NotFound();
        }

        return Ok(new { cards });
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddCard(CardDto card)
    {
        bool result = await _cardService.AddCardAsync(card);
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
        bool result = await _cardService.DeleteCardAsync(id);
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
        bool result = await _cardService.UpdateCardAsync(id, card);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}