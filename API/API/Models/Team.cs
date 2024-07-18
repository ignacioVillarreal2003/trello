using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Team
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Required]
    [StringLength(50)]
    public string TeamName { get; set; }
    public string OwnerEmail { get; set; }
    
    [ForeignKey(nameof(OwnerEmail))]
    public User User { get; set; }
    
    [Required]
    [StringLength(200, MinimumLength = 8)]
    public string TeamPassword { get; set; }

    public ICollection<UserTeam> UserTeams { get; set; }
    public ICollection<Board> Boards { get; set; }
}