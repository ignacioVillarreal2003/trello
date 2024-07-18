using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class CardLabel
{
    public long CardId { get; set; }
    public string LabelTitle { get; set; }
    public string Color { get; set; }

    [ForeignKey(nameof(CardId))]
    public Card Card { get; set; }

    [ForeignKey(nameof(LabelTitle) + "," + nameof(Color))]
    public Label Label { get; set; }
}