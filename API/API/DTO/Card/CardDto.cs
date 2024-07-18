using System.ComponentModel.DataAnnotations;

namespace API.DTO.Card;

public class CardDto
{
    [Required]
    [StringLength(50)]
    public string CardTitle { get; set; }
    public long ListId { get; set; }
    
    [Required]
    public DateTime Start { get; set; }
    
    [Required]
    public DateTime End { get; set; }
    
    [Required]
    [StringLength(255)]
    public string Description { get; set; }
}