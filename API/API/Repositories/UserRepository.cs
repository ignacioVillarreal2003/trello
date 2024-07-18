using API.Context;
using API.Interfaces.Repositories;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _context.Users.FindAsync(email);
    }
    
    public async Task<List<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }
    
    public async Task<bool> AddUserAsync(User user)
    {
        _context.Users.Add(user);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteUserAsync(string email)
    {
        var user = await _context.Users.FindAsync(email);
        if (user == null)
        {
            return false;
        }

        _context.Users.Remove(user);
        return await _context.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> UpdateUserAsync(User user)
    {
        _context.Users.Update(user);
        return await _context.SaveChangesAsync() > 0;
    }
}