using API.DTO.CardLabel;
using API.DTO.CardUser;
using API.DTO.Team;
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
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddCardUser(CardUserDto cardUser)
    {
        var result = await _cardUserService.AddCardUserAsync(cardUser);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
    
    [HttpDelete]
    [Authorize]
    public async Task<ActionResult<bool>> DeleteCardUser(CardUserDto cardUser)
    {
        var result = await _cardUserService.DeleteCardUserAsync(cardUser);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}