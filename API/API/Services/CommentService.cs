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

    public async Task<Comment> GetCommentByIdAsync(long id)
    {
        return await _commentRepository.GetCommentByIdAsync(id);
    }
    
    public async Task<List<Comment>> GetCommentByCardIdAsync(long id)
    {
        return await _commentRepository.GetCommentByCardIdAsync(id);
    }

    public async Task<List<Comment>> GetCommentsAsync()
    {
        return await _commentRepository.GetCommentsAsync();
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
        c.CommentDate = comment.CommentDate;
        c.CommentDescription = comment.CommentDescription;
        
        return await _commentRepository.UpdateCommentAsync(c);
    }
}