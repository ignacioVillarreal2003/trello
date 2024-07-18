using API.DTO.Label;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("[controller]")]
[ApiController]
public class LabelController : ControllerBase
{
    private readonly LabelService _labelService;

    public LabelController(LabelService labelService)
    {
        _labelService = labelService;
    }

    [HttpGet("{labelTitle}-{color}")]
    [Authorize]
    public async Task<ActionResult<Label>> GetLabel(string labelTitle, string color)
    {
        var label = await _labelService.GetLabelAsync(labelTitle, color);
        if (label == null)
        {
            return NotFound();
        }

        return label;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<Label>>> GetLabels()
    {
        return await _labelService.GetLabelsAsync();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddLabel(LabelDto label)
    {
        var result = await _labelService.AddLabelAsync(label);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{labelTitle}-{color}")]
    [Authorize]
    public async Task<IActionResult> DeleteLabel(string labelTitle, string color)
    {
        var result = await _labelService.DeleteLabelAsync(labelTitle, color);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}