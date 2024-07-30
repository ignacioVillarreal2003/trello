using System.ComponentModel.DataAnnotations;

namespace API.DTO.Board;

public class BoardDto
{
    [Required]
    [StringLength(50)]
    public string BoardTitle { get; set; }
    
    [Required]
    public string Theme { get; set; }
    
    [Required]
    public string TeamName { get; set; }
}