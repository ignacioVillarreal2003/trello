using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Board
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Required]
    [StringLength(50)]
    public string BoardTitle { get; set; }

    [Required]
    public string Theme { get; set; }
    public string TeamName { get; set; }

    [ForeignKey(nameof(TeamName))]
    public Team Team { get; set; }

    public ICollection<List> Lists { get; set; }
}