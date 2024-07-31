using System.ComponentModel.DataAnnotations;

namespace API.DTO;

public class UpdateUserDto
{
    [StringLength(50)]
    public string Username { get; set; }
    
    [StringLength(200, MinimumLength = 8)]
    public string Password { get; set; }
}