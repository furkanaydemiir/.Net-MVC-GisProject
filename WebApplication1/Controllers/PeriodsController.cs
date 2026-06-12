using Microsoft.AspNetCore.Mvc;
using WebApplication1.Business;
using WebApplication1.Dtos;

namespace WebApplication1.Controllers;


[ApiController]
[Route("api/periods")]
public class PeriodsController : ControllerBase
{
    private readonly IPeriodService _periodService;

    public PeriodsController(IPeriodService periodService)
    {
        _periodService = periodService;
    }
    [HttpGet]
    public IActionResult GetAllPeriods()
    {
        var periods = _periodService.GetAllPeriods();
        return Ok(periods);
    }
    [HttpGet("{id}")]

    public IActionResult GetPeriodById(int id)
    {
        var period = _periodService.GetPeriodById(id);
        if (period is null)
        {
            return NotFound("Aranan period mevcut değil");
        }
        return Ok(period);
    }
    [HttpPost]
    public IActionResult AddPeriod([FromBody] AddPeriodDto dto)
    {
        var newPeriod = _periodService.AddPeriod(dto);
        return Ok(newPeriod);
    }
    [HttpPut("{id}")]
    public IActionResult UpdatePeriod(int id, UpdatePeriodDto dto)
    {
        var isUpdated = _periodService.UpdatePeriod(id, dto);

        if (!isUpdated)
        {
            return BadRequest("İşlem gerçekleştirilemedi");
        }
        else
        {
            return NoContent();
        }
    }
    [HttpDelete("{id}")]
    public IActionResult DeletePeriod(int id)
    {
        var isDeleted = _periodService.DeletePeriod(id);
        if (!isDeleted)
        {
            return NotFound($"{id} numaralı periyot bulunamadı");
        }
        else
        {
            return NoContent();
        }
    }
}