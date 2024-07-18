using System.ComponentModel.DataAnnotations;

namespace API.DTO.List;

public class UpdateListDto
{
    [Required]
    [StringLength(50)]
    public string ListTitle { get; set; }
}