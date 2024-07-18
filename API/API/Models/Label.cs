using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Label
{
    [Required]
    [StringLength(50)]
    public string LabelTitle { get; set; }

    [Required]
    [StringLength(8)]
    public string Color { get; set; }

    public ICollection<CardLabel> CardLabels { get; set; }
}