using NetTopologySuite.Geometries; 
namespace WebApplication1.Models;

public class PolygonModel
{
    public int Id { get; set; }
    public string PolygonName { get; set; }

    public Geometry Location { get; set; }
    public int PeriodId { get; set; } 

    public PeriodModel Period { get; set; }
}