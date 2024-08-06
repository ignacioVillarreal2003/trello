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
    public async Task<ActionResult<List<Comment>>> GetComment(long id)
    {
        List<Comment> comments = await _commentService.GetCommentAsync(id);
        if (comments == null)
        {
            return NotFound();
        }
        
        return Ok(new { comments });
    }
    
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddComment(CommentDto comment)
    {
        bool result = await _commentService.AddCommentAsync(comment);
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
        bool result = await _commentService.DeleteCommentAsync(id);
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
        bool result = await _commentService.UpdateCommentAsync(id, comment);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}