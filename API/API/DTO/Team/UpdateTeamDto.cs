using System.ComponentModel.DataAnnotations;

namespace API.DTO.Team;

public class UpdateTeamDto
{
    [Required]
    public string Theme { get; set; }
}