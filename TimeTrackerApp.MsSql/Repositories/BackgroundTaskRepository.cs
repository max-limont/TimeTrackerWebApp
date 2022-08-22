using Dapper;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class BackgroundTaskRepository : IBackgroundTaskRepository
	{
		private readonly string connectionString;

		public BackgroundTaskRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<BackgroundTask> CreateAsync(BackgroundTask task)
		{
			string query = @"INSERT INTO BackgroundTasks(Type, DateTime) VALUES (@Type, @DateTime) SELECT @@IDENTITY";

			using (var connection = new SqlConnection(connectionString))
			{
				int identity = await connection.QuerySingleOrDefault(query, task);
				if (identity == 0)
					throw new Exception("Background task creation error!");
				try
				{
					return await GetByIdAsync(identity);
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}

		public async Task<IEnumerable<BackgroundTask>> FetchAllAsync()
		{
			string query = @"SELECT * FROM BackgroundTasks";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<BackgroundTask>(query);
			}
		}

		public async Task<IEnumerable<BackgroundTask>> FetchByTypeAsync(string type)
		{
			string query = @"SELECT * FROM BackgroundTasks WHERE Type = @Type";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<BackgroundTask>(query, new { Type = type });
			}
		}

		public async Task<IEnumerable<BackgroundTask>> FetchByDateTimeAsync(DateTime dateTime)
		{
			string query = @"SELECT * FROM BackgroundTasks WHERE DateTime = @DateTime";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<BackgroundTask>(query, new { DateTime = dateTime });	
			}
		}

		public async Task<BackgroundTask> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM BackgroundTasks WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var task = await connection.QuerySingleOrDefaultAsync<BackgroundTask>(query, new { Id = id });
				if (task is not null)
				{
					return task;
				}
				throw new Exception("Task with this id was not found!");
			}
		}

		public async Task<BackgroundTask> GetLatestAsync()
		{
			string query = @"SELECT TOP 1 * FROM BackgroundTasks ORDER BY DateTime DESC";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QuerySingleOrDefaultAsync<BackgroundTask>(query);
			}
		}

		public async Task<BackgroundTask> RemoveAsync(int id)
		{
			string query = @"DELETE FROM BackgroundTasks WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var task = await GetByIdAsync(id);
					int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
					if (affectedRows > 0)
					{
						return task;
					}
					throw new Exception("Task removal error!");
				} 
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}

		public async Task<BackgroundTask> GetLatestByTypeAsync(string type)
		{
			string query = @"SELECT TOP 1 * FROM BackgroundTasks WHERE Type = @Type ORDER BY DateTime DESC";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QuerySingleOrDefaultAsync<BackgroundTask>(query, new { Type = type });
			}
		}
	}
}
