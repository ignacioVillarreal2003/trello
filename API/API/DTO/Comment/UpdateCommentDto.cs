using System.ComponentModel.DataAnnotations;

namespace API.DTO.Comment;

public class UpdateCommentDto
{
    [Required]
    [StringLength(255)]
    public string CommentDescription { get; set; }
    
    [Required]
    public DateTime CommentDate { get; set; }
}