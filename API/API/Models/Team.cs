using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Team
{

    [Key]
    [StringLength(50)]
    public string TeamName { get; set; }
    
    [Required]
    public string Theme { get; set; }

    public ICollection<UserTeam> UserTeams { get; set; }
    public ICollection<Board> Boards { get; set; }
}