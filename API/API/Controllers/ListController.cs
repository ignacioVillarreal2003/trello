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
        List<List> lists = await _listService.GetListsAsync(boardId);
        
        if (lists == null)
        {
            return NotFound();
        }

        return Ok(new { lists });
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddList(ListDto list)
    {
        bool result = await _listService.AddListAsync(list);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteList(long id)
    {
        bool result = await _listService.DeleteListAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateList(long id, UpdateListDto list)
    {
        bool result = await _listService.UpdateListAsync(id, list);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}