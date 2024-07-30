using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class UserTeamDto
{
    [Required]
    [EmailAddress]
    public string UserEmail { get; set; }
    
    [Required]
    public string TeamName { get; set; }
}