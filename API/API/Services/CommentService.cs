using API.DTO.Comment;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class CommentService
{
    private readonly ICommentRepository _commentRepository;

    public CommentService(ICommentRepository commentRepository)
    {
        _commentRepository = commentRepository;
    }
    
    public async Task<List<Comment>> GetCommentAsync(long id)
    {
        return await _commentRepository.GetCommentByCardIdAsync(id);
    }

    public async Task<bool> AddCommentAsync(CommentDto comment)
    {
        Comment c = new Comment();
        c.CommentDate = comment.CommentDate;
        c.CommentDescription = comment.CommentDescription;
        c.CardId = comment.CardId;
        
        return await _commentRepository.AddCommentAsync(c);
    }

    public async Task<bool> DeleteCommentAsync(long id)
    {
        return await _commentRepository.DeleteCommentAsync(id);
    }

    public async Task<bool> UpdateCommentAsync(long id, UpdateCommentDto comment)
    {
        Comment c = await _commentRepository.GetCommentByIdAsync(id);

        if (c == null)
        {
            return false;
        }

        if (comment.CommentDate != null)
        {
            c.CommentDate = comment.CommentDate;
        }

        if (comment.CommentDescription.Length > 0)
        {
            c.CommentDescription = comment.CommentDescription;
        }
        
        return await _commentRepository.UpdateCommentAsync(c);
    }
}