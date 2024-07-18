using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class CardUser
{
    public long CardId { get; set; }
    public string UserEmail { get; set; }

    [ForeignKey(nameof(CardId))]
    public Card Card { get; set; }

    [ForeignKey(nameof(UserEmail))]
    public User User { get; set; }
}