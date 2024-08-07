using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class CommentRepository : ICommentRepository
{
    private readonly AppDbContext _context;

    public CommentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Comment> GetCommentByIdAsync(long id)
    {
        return await _context.Comments.FindAsync(id);
    }
    
    public async Task<List<Comment>> GetCommentByCardIdAsync(long cardId)
    {
        return await _context.Comments.Where(c => c.CardId == cardId).ToListAsync();
    }
    
    public async Task<List<Comment>> GetCommentsAsync()
    {
        return await _context.Comments.ToListAsync();
    }

    public async Task<bool> AddCommentAsync(Comment comment)
    {
        _context.Comments.Add(comment);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteCommentAsync(long id)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return false;
        }

        _context.Comments.Remove(comment);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateCommentAsync(Comment comment)
    {
        _context.Comments.Update(comment);
        return await _context.SaveChangesAsync() > 0;
    }
}