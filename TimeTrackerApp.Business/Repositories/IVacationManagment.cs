using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories;

public interface IVacationManagment
{
    public Task<VacationManagment> GetByIdVacationManagent(int id);
    public Task<VacationManagment> UpdateVacationManagment(VacationManagment model);
    public Task<VacationManagment> DeleteVacationManagment(int id);
    public Task<VacationManagment> CreateVacationManagment(VacationManagment model);
}