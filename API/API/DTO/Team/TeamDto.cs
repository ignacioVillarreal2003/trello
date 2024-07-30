using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class TeamDto
{
    [Required]
    [StringLength(50)]
    public string TeamName { get; set; }
    
    [Required]
    public string Theme { get; set; }
}