using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories;

public interface IVacationLevelRepository
{
    Task<VacationLevel> CreateVacationLevel(VacationLevel model);
    Task<List<VacationLevel>> GetVacationLevels();
    Task<VacationLevel> UpdateVacationLevel(VacationLevel model);
    Task<VacationLevel> RemoveVacationLevel(int id);
    Task<VacationLevel> GetVacationLevelById(int id);
} 