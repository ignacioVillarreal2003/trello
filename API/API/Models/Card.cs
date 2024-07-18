using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Card
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Required]
    [StringLength(50)]
    public string CardTitle { get; set; }

    public long ListId { get; set; }

    [ForeignKey(nameof(ListId))]
    public List List { get; set; }

    [Required]
    public DateTime Start { get; set; }

    [Required]
    public DateTime End { get; set; }

    [Required]
    [StringLength(255)]
    public string Description { get; set; }

    public ICollection<CardUser> CardUsers { get; set; }
    public ICollection<Comment> Comments { get; set; }
    public ICollection<CardLabel> CardLabels { get; set; }
}