using API.Models;

namespace API.Interfaces.Repositories;

public interface ICommentRepository
{
    Task<Comment> GetCommentByIdAsync(long id);
    Task<List<Comment>> GetCommentByCardIdAsync(long id);
    Task<List<Comment>> GetCommentsAsync();
    Task<bool> AddCommentAsync(Comment comment);
    Task<bool> DeleteCommentAsync(long id);
    Task<bool> UpdateCommentAsync(Comment comment);
}