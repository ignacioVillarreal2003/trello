using API.DTO.List;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class ListController : ControllerBase
{
    private readonly ListService _listService;

    public ListController(ListService listService)
    {
        _listService = listService;
    }
    
    [HttpGet("{boardId}")]
    [Authorize]
    public async Task<ActionResult<List<List>>> GetLists(long boardId)
    {
        var lists = await _listService.GetListsAsync(boardId);
        if (lists == null)
        {
            return NotFound();
        }

        return Ok(new { lists });
    } // FUNCIONA

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddBoard(ListDto list)
    {
        var result = await _listService.AddListAsync(list);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    } // FUNCIONA

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteBoard(long id)
    {
        var result = await _listService.DeleteListAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateBoard(long id, UpdateListDto list)
    {
        var result = await _listService.UpdateListAsync(id, list);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}