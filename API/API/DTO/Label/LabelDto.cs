using System.ComponentModel.DataAnnotations;

namespace API.DTO.Label;

public class LabelDto
{
    [Required]
    [StringLength(50)]
    public string LabelTitle { get; set; }
    
    [Required]
    [StringLength(8), MinLength(8)]
    public string Color { get; set; }
}