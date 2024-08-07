using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class UserTeam
{
    public string UserEmail { get; set; }
    public string TeamName { get; set; }

    [ForeignKey(nameof(UserEmail))]
    public User User { get; set; }

    [ForeignKey(nameof(TeamName))]
    public Team Team { get; set; }
}