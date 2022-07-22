using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IVacationRequestRepository
	{
		Task<IEnumerable<VacationRequest>> FetchAllAsync();
		Task<IEnumerable<VacationRequest>> FetchAllUserVacationRequestsAsync(int userId);
		Task<VacationRequest> GetByIdAsync(int id);
		Task<VacationRequest> CreateAsync(VacationRequest vacationRequest);
		Task<VacationRequest> EditAsync(VacationRequest vacationRequest);
		Task<VacationRequest> RemoveAsync(int id);
	}
}
