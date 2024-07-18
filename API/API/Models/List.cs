using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class List
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Required]
    [StringLength(50)]
    public string ListTitle { get; set; }

    public long BoardId { get; set; }

    [ForeignKey(nameof(BoardId))]
    public Board Board { get; set; }

    public ICollection<Card> Cards { get; set; }
}