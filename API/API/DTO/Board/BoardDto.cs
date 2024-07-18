using System.ComponentModel.DataAnnotations;

namespace API.DTO.Board;

public class BoardDto
{
    [Required]
    [StringLength(50)]
    public string BoardTitle { get; set; }
    public long TeamId { get; set; }
}