using NetTopologySuite.Geometries;
namespace WebApplication1.Dtos;

public record AddPolygonDto
(
    string PolygonName,
    Geometry Location,
    int PeriodId
);
