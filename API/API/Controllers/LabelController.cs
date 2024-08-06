using API.DTO.Label;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ApiLabel = API.Models.Label;

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

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<ApiLabel>>> GetLabels()
    {
        List<ApiLabel> labels = await _labelService.GetLabelsAsync();
        
        if (labels == null)
        {
            return NotFound();
        }
        
        return Ok( new { labels });
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<bool>> AddLabel(LabelDto label)
    {
        bool result = await _labelService.AddLabelAsync(label);
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
        bool result = await _labelService.DeleteLabelAsync(labelTitle, color);
        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}