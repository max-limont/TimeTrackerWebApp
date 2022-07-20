using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IUserRepository
	{
		Task<IEnumerable<User>> FetchAllAsync();
		Task<User> GetByIdAsync(int id);
		Task<User> CreateAsync(User user);
		Task<User> EditAsync(User user);
		Task<User> RemoveAsync(int id);
	}
}
