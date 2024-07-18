using API.Models;

namespace API.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User> GetUserByEmailAsync(string email);
    Task<List<User>> GetUsersAsync();
    Task<bool> AddUserAsync(User user);
    Task<bool> DeleteUserAsync(string email);
    Task<bool> UpdateUserAsync(User user);
}