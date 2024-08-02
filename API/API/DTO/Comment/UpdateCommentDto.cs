using System.ComponentModel.DataAnnotations;

namespace API.DTO.Comment;

public class UpdateCommentDto
{
    [StringLength(255)]
    public string CommentDescription { get; set; }
    
    public DateTime CommentDate { get; set; }
}