using API.DTO;
using API.Interfaces.Repositories;
using API.Models;

namespace API.Services;

public class UserService
{
    private readonly IUserRepository _userRepository;
    
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _userRepository.GetUserByEmailAsync(email);
    }
    
    public async Task<List<User>> GetUsersAsync()
    {
        return await _userRepository.GetUsersAsync();
    }
    
    public async Task<bool> DeleteUserAsync(string email)
    {
        return await _userRepository.DeleteUserAsync(email);
    }
    
    public async Task<bool> UpdateUserAsync(string email, UpdateUserDto user)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

        User u = await _userRepository.GetUserByEmailAsync(email);
        if (u == null)
        {
            return false;
        }

        u.Password = passwordHash;
        u.Username = user.Username;
        return await _userRepository.UpdateUserAsync(u);
    }
    
    public async Task<bool> RegisterUserAsync(UserDto user)
    {
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

        User u = new User();
        u.Email = user.Email;
        u.Password = passwordHash;
        u.Username = user.Username;
        
        return await _userRepository.AddUserAsync(u);
    }
    
    public async Task<bool> LoginUserAsync(LoginUserDto user)
    {
        User u = await _userRepository.GetUserByEmailAsync(user.Email);
        if (u == null)
        {
            return false;
        }

        bool verified = BCrypt.Net.BCrypt.Verify(user.Password, u.Password);
        if (!verified)
        {
            return false;
        }

        return true;
    }
}