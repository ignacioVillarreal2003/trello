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

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<List>> GetListById(long id)
    {
        var list = await _listService.GetListByIdAsync(id);
        if (list == null)
        {
            return NotFound();
        }

        return list;
    }
    
    [HttpGet("board/{id}")]
    [Authorize]
    public async Task<ActionResult<List<List>>> GetListByBoardId(long id)
    {
        var list = await _listService.GetListByBoardIdAsync(id);
        if (list == null)
        {
            return NotFound();
        }

        return list;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<List>>> GetLists()
    {
        return await _listService.GetListsAsync();
    }

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
    }

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