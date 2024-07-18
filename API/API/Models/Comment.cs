using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Comment
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Required]
    [StringLength(255)]
    public string CommentDescription { get; set; }

    public long CardId { get; set; }

    [ForeignKey(nameof(CardId))]
    public Card Card { get; set; }

    [Required]
    public DateTime CommentDate { get; set; }
}