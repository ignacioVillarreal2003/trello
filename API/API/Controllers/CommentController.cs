using API.DTO.Comment;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly CommentService _commentService;

    public CommentController(CommentService commentService)
    {
        _commentService = commentService;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Comment>> GetCommentById(long id)
    {
        var comment = await _commentService.GetCommentByIdAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        return comment;
    }
    
    [HttpGet("card/{id}")]
    [Authorize]
    public async Task<ActionResult<List<Comment>>> GetCommentByCardId(long id)
    {
        var comment = await _commentService.GetCommentByCardIdAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        return comment;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Comment>>> GetComments()
    {
        return await _commentService.GetCommentsAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddComment(CommentDto comment)
    {
        var result = await _commentService.AddCommentAsync(comment);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteComment(long id)
    {
        var result = await _commentService.DeleteCommentAsync(id);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateComment(long id, UpdateCommentDto comment)
    {
        var result = await _commentService.UpdateCommentAsync(id, comment);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}