using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
	public interface IRecordRepository
	{
		Task<IEnumerable<Record>> FetchAllAsync();
		Task<IEnumerable<Record>> FetchAllUserRecordsAsync(int userId);
		Task<IEnumerable<Record>> FetchUserRecordsByMonthAsync(int userId, int monthNumber);
		Task<IEnumerable<Record>> FetchUserRecordsByDateAsync(int userId, DateTime date);
		Task<Record> GetByIdAsync(int id);
		Task<Record> CreateAsync(Record record);
		Task<Record> EditAsync(Record record);
		Task<Record> RemoveAsync(int id);
	}
}
