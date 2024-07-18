using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class DeleteUserTeamDto
{
    [Required]
    [EmailAddress]
    public string UserEmail { get; set; }
    
    [Required]
    public long TeamId { get; set; }
}