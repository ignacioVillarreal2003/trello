using System.ComponentModel.DataAnnotations;

namespace API.DTO.Card;

public class UpdateCardDto
{
    [Required]
    [StringLength(50)]
    public string CardTitle { get; set; }
    
    [Required]
    public DateTime End { get; set; }
    
    [Required]
    [StringLength(255)]
    public string Description { get; set; }
}