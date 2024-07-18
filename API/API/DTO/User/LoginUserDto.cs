using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class LoginUserDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 8)]
    public string Password { get; set; }
}