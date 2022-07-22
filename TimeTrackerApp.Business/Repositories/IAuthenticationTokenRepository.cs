using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IAuthenticationTokenRepository
	{
		Task<IEnumerable<AuthenticationToken>> FetchAllAsync();
		Task<AuthenticationToken> GetByIdAsync(int id);
		Task<AuthenticationToken> CreateAsync(AuthenticationToken authenticationToken);
		Task<AuthenticationToken> EditAsync(AuthenticationToken authenticationToken);
		Task<AuthenticationToken> RemoveAsync(int id);
	}
}
