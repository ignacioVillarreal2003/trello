using System.ComponentModel.DataAnnotations;

namespace API.DTO.CardLabel;

public class CardLabelDto
{
    [Required]
    public long CardId { get; set; }
    
    [Required]
    public string LabelTitle { get; set; }
    
    [Required]
    public string Color { get; set; }
}