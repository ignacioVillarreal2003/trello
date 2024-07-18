using System.ComponentModel.DataAnnotations;

namespace API.Models;
public class User
{
    [Key]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(50)]
    public string Username { get; set; }

    [Required]
    [StringLength(200)]
    public string Password { get; set; }

    public ICollection<UserTeam> UserTeams { get; set; }
    public ICollection<CardUser> CardUsers { get; set; }
}