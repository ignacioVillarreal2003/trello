using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class UserTeamDto
{
    [Required]
    [EmailAddress]
    public string UserEmail { get; set; }
    
    [Required]
    public long TeamId { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 8)]
    public string TeamPassword { get; set; }
}