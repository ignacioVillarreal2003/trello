using System.ComponentModel.DataAnnotations;

namespace API.DTO.Board;

public class UpdateBoardDto
{
    [StringLength(50)]
    public string BoardTitle { get; set; }
    
    public string Theme { get; set; }
}