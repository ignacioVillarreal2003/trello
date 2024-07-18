using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class TeamDto
{
    [Required]
    [StringLength(50)]
    public string TeamName { get; set; }
    
    [Required]
    [EmailAddress]
    public string OwnerEmail { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 8)]
    public string TeamPassword { get; set; }
}