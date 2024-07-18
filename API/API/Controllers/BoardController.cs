using API.DTO.Board;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class BoardController : ControllerBase
{
    private readonly BoardService _boardService;

    public BoardController(BoardService boardService)
    {
        _boardService = boardService;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Board>> GetBoardById(long id)
    {
        var board = await _boardService.GetBoardByIdAsync(id);
        if (board == null)
        {
            return NotFound();
        }

        return board;
    }
    
    [HttpGet("team/{id}")]
    [Authorize]
    public async Task<ActionResult<List<Board>>> GetBoardsByTeamId(long id)
    {
        var board = await _boardService.GetBoardsByTeamIdAsync(id);
        if (board == null)
        {
            return NotFound();
        }

        return board;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Board>>> GetBoards()
    {
        return await _boardService.GetBoardsAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddBoard(BoardDto board)
    {
        var result = await _boardService.AddBoardAsync(board);
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
        var result = await _boardService.DeleteBoardAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateBoard(long id, UpdateBoardDto board)
    {
        var result = await _boardService.UpdateBoardAsync(id, board);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}