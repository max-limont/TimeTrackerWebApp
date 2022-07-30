using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IRecordRepository
	{
		Task<IEnumerable<Record>> FetchAllAsync();
		Task<IEnumerable<Record>> FetchAllUserRecordsAsync(int userId);
		Task<Record> GetByIdAsync(int id);
		Task<Record> CreateAsync(Record record);
		Task<Record> EditAsync(Record record);
		Task<Record> RemoveAsync(int id);
	}
}
