using API.DTO.CardLabel;
using API.DTO.CardUser;
using API.DTO.Team;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class CardUserController : ControllerBase
{
    private readonly CardUserService _cardUserService;

    public CardUserController(CardUserService cardUserService)
    {
        _cardUserService = cardUserService;
    }
    
    [HttpGet("{cardId}")]
    [Authorize]
    public async Task<ActionResult<List<User>>> GetCardUser(long cardId)
    {
        List<User> users = await _cardUserService.GetCardUserAsync(cardId);
        
        if (users == null)
        {
            return NotFound();
        }
        
        return users;
    }
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddCardUser(CardUserDto cardUser)
    {
        bool result = await _cardUserService.AddCardUserAsync(cardUser);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
    
    [HttpDelete("{cardId}-{userEmail}")]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteCardUser(long cardId, string userEmail)
    {
        bool result = await _cardUserService.DeleteCardUserAsync(cardId, userEmail);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}