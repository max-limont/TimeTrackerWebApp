using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface ISickLeaveRepository
	{
		Task<IEnumerable<SickLeave>> FetchAllAsync();
		Task<IEnumerable<SickLeave>> FetchAllByEmployeeIdAsync(int employeeId);
		Task<IEnumerable<SickLeave>> FetchAllForManagerByManagerIdAsync(int managerId);
		Task<SickLeave> GetByIdAsync(int id);
		Task<SickLeave> CreateAsync(SickLeave sickLeave);
		Task<SickLeave> EditAsync(SickLeave sickLeave);
		Task<SickLeave> RemoveAsync(int id);
	}
}
