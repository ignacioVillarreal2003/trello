using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class UserTeamDto
{
    [Required]
    [EmailAddress]
    public string UserEmail { get; set; }
    
    [StringLength(50)]
    public string TeamName { get; set; }
}