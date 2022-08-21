using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IUserRepository
	{
		Task<IEnumerable<User>> FetchAllAsync();
		Task<IEnumerable<User>> FetchPageListAsync(int from, int contentPerPage, string orderBy = "FirstName", bool isReverse = false);
		Task<IEnumerable<User>> FetchSearchListAsync(string request);
		Task<IEnumerable<User>> FetchFullTimeEmployeesAsync();
		Task<IEnumerable<User>> FetchPartTimeEmployeesAsync();
		Task<int> GetCountAsync();
		Task<User> GetByIdAsync(int id);
		Task<User> GetByEmailAsync(string email);
		Task<User> CreateAsync(User user);
		Task<User> EditAsync(User user);
		Task<User> RemoveAsync(int id);
		Task<User> ChangePassword(int id, string password);
	}
}
