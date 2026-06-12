using Microsoft.AspNetCore.Mvc;
using WebApplication1.Business;
using WebApplication1.Dtos;

namespace WebApplication1.Controllers;

[ApiController]
[Route("api/polygons")]
public class PolygonsControllers : ControllerBase
{
    private readonly IPolygonService _polygonService;

    public PolygonsControllers(IPolygonService polygonService)
    {
        _polygonService = polygonService;
    }
    [HttpGet]
    public IActionResult GetAllPolygonsInfo()
    {
        var polygons = _polygonService.GetAllPolygonsInfo();
        return Ok(polygons);
    }
    [HttpGet("{id}")]
    public IActionResult GetPolygonInfoById(int id)
    {
        var targetPolygon = _polygonService.GetPolygonInfoById(id);
        if (targetPolygon is null)
        {
            return NotFound("Bu poligon bulunamadı");
        }
        return Ok(targetPolygon);
    }
    [HttpPost]
    public IActionResult AddNewPolygon([FromBody] AddPolygonDto dto)
    {
        var NewPolygon = _polygonService.AddNewPolygon(dto);
        return Ok(NewPolygon);
    }
    [HttpPut]
    public IActionResult UpdatePolygon(int id,UpdatePolygonDto dto)
    {
        var isUpdated = _polygonService.UpdatePolygon(id,dto);

        if (!isUpdated)
        {
            return BadRequest("İşlem gerçekleştirilemedi");
        }
        else
        {
            return NoContent();
        }
    }
    [HttpDelete]
    public IActionResult DeletePolygon(int id)
    {
        var isDeleted = _polygonService.DeletePolygon(id);
        if (!isDeleted)
        {
            return NotFound($"{id} numaralı polygon bulunamadı");
        }
        else
        {
            return NoContent();
        }
    }
}