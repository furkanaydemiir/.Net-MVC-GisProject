using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Business;

public interface IPeriodService
{
    public List<PeriodModel> GetAllPeriods();

    public PeriodModel GetPeriodById(int id);

    public PeriodModel AddPeriod(AddPeriodDto dto);

    public bool UpdatePeriod(int id, UpdatePeriodDto dto);

    public bool DeletePeriod(int id);
}