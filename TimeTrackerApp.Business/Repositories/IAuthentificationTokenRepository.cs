using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IAuthentificationTokenRepository
	{
		Task<IEnumerable<AuthentificationToken>> FetchAllAsync();
		Task<AuthentificationToken> GetByIdAsync(int id);
		Task<AuthentificationToken> CreateAsync(AuthentificationToken authentificationToken);
		Task<AuthentificationToken> EditAsync(AuthentificationToken authentificationToken);
		Task<AuthentificationToken> RemoveAsync(int id);
	}
}
