using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class UserDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Username { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 8)]
    public string Password { get; set; }
}