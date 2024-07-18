using System.ComponentModel.DataAnnotations;

namespace API.DTO.Comment;

public class CommentDto
{
    [Required]
    [StringLength(255)]
    public string CommentDescription { get; set; }
    public long CardId { get; set; }
    
    [Required]
    public DateTime CommentDate { get; set; }
}