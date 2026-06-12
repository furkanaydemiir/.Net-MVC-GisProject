using WebApplication1.Data;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Business;

public class PolygonManager : IPolygonService
{
    private readonly AppDbContext _context;

    public PolygonManager(AppDbContext context)
    {
        _context = context;
    }
    public List<PolygonModel> GetAllPolygonsInfo()
    {
        return _context.Polygons.ToList();
    }
    public PolygonModel GetPolygonInfoById(int id)
    {
        return _context.Polygons.Find(id);
    }
    public PolygonModel AddNewPolygon(AddPolygonDto dto)
    {
        var newPolygon = new PolygonModel
        {
            PolygonName = dto.PolygonName,
            Location = dto.Location,
            PeriodId = dto.PeriodId
        };
        _context.Polygons.Add(newPolygon);
        _context.SaveChanges();
        return newPolygon;
    }
    public bool UpdatePolygon(int id,UpdatePolygonDto dto)
    {
        var targetPolygon = _context.Polygons.Find(id);
        if(targetPolygon == null)
        {
            return false;
        }
        targetPolygon.PolygonName = dto.PolygonName;
        targetPolygon.Location = dto.Location;
        targetPolygon.PeriodId = dto.PeriodId;
        _context.SaveChanges();
        return true;
    }
    public bool DeletePolygon(int id)
    {
      var targetPolygon = _context.Polygons.Find(id);
       if(targetPolygon is null)
        {
            return false;
        } 
       _context.Polygons.Remove(targetPolygon);
       _context.SaveChanges();
       return true; 
    }
}