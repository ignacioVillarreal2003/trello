using System.ComponentModel.DataAnnotations;

namespace API.DTO.List;

public class ListDto
{
    [Required]
    [StringLength(50)]
    public string ListTitle { get; set; }
    public long BoardId { get; set; }
}