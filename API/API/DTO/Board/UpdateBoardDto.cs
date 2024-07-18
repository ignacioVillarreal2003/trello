using System.ComponentModel.DataAnnotations;

namespace API.DTO.Board;

public class UpdateBoardDto
{
    [Required]
    [StringLength(50)]
    public string BoardTitle { get; set; }
}