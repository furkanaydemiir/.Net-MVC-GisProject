using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Business;

public interface IPolygonService
{
    public List<PolygonModel> GetAllPolygonsInfo();

    public PolygonModel GetPolygonInfoById(int id);

    public PolygonModel AddNewPolygon(AddPolygonDto dto);

    public bool UpdatePolygon(int id, UpdatePolygonDto dto);

    public bool DeletePolygon(int id);
}