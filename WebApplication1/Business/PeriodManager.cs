using WebApplication1.Data;
using WebApplication1.Dtos;
using WebApplication1.Models;

namespace WebApplication1.Business;

public class PeriodManager : IPeriodService
{
    private readonly AppDbContext _context;

    public PeriodManager(AppDbContext context)
    {
        _context = context;
    }
    public List<PeriodModel> GetAllPeriods()
    {
        return _context.Periods.ToList();
    }
    public PeriodModel GetPeriodById(int id)
    {
        return _context.Periods.Find(id);
    }
    public PeriodModel AddPeriod(AddPeriodDto dto)
    {
        var newPeriod = new PeriodModel
        {
            PeriodYear = dto.PeriodYear
        };
        _context.Add(newPeriod);
        _context.SaveChanges();
        return newPeriod;
    }
    public bool UpdatePeriod(int id, UpdatePeriodDto dto)
    {
       var targetPeriod = _context.Periods.Find(id);
       if(targetPeriod is null)
        {
            return false;
        }
        targetPeriod.PeriodYear = dto.PeriodYear;
        _context.SaveChanges();
        return true;
    }
    public bool DeletePeriod(int id)
    {
        var targetPeriod = _context.Periods.Find(id);
        if(targetPeriod is null)
        {
            return false;
        }
        _context.Periods.Remove(targetPeriod);
        _context.SaveChanges();
        return true;
    }
}