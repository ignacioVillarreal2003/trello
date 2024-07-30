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
    
    [HttpGet("{teamName}")]
    [Authorize]
    public async Task<ActionResult<List<Board>>> GetBoards(string teamName)
    {
        var boards = await _boardService.GetBoardsAsync(teamName);
        if (boards == null)
        {
            return NotFound();
        }

        return Ok(new { boards });

    } // FUNCIONA

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
    } // FUNCIONA

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
    } // FUNCIONA

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
    } // FUNCIONA
}