using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IVacationRepository
	{
		Task<List<Vacation>> FetchAllAsync();
		Task<IEnumerable<Vacation>> FetchAllUserVacationAsync(int userId); 
		Task<Vacation> ChangeAcceptedState(int id, bool stateAccept);
		Task<Vacation> GetByIdAsync(int id);
		Task<Vacation> CreateAsync(Vacation vacation);
		Task<Vacation> EditAsync(Vacation vacation);
		Task<Vacation> RemoveAsync(int id);
		Task<List<Vacation>> GetRequestVacation(int receiverUserId);
	}
}
