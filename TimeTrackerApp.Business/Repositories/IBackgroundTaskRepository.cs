using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IBackgroundTaskRepository
	{
		Task<IEnumerable<BackgroundTask>> FetchAllAsync();
		Task<IEnumerable<BackgroundTask>> FetchByTypeAsync(string type);
		Task<IEnumerable<BackgroundTask>> FetchByDateTimeAsync(DateTime dateTime);
		Task<BackgroundTask> GetLatestAsync();
		Task<BackgroundTask> GetLatestByTypeAsync(string type);
		Task<BackgroundTask> GetByIdAsync(int id);
		Task<BackgroundTask> CreateAsync(BackgroundTask task);
		Task<BackgroundTask> RemoveAsync(int id);
	}
}
