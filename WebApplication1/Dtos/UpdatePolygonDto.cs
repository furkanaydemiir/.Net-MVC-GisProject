using NetTopologySuite.Geometries; 

namespace WebApplication1.Dtos;

public record UpdatePolygonDto
(
    string PolygonName,
    Geometry Location,
    int PeriodId
);