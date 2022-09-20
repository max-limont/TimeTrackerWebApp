using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories;

public interface IUserManagement
{
    public Task<VacationManagement?> GetByIdVacationManagent(int id);
    public Task<List<VacationManagement>> GetByUserIdVacationManagment(int userId);
    public Task<VacationManagement> UpdateVacationManagment(VacationManagement model);
    public Task<VacationManagement> DeleteVacationManagment(int id);
    public Task<VacationManagement> CreateVacationManagment(VacationManagement model);
}