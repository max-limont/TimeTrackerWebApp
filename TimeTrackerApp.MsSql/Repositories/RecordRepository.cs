using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class RecordRepository : IRecordRepository
	{
		private readonly string connectionString;

		public RecordRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<Record> CreateAsync(Record record)
		{
			string query = @"INSERT INTO Records (WorkingTime, EmployeeId, EditorId, IsAutomaticallyCreated, CreatedAt) VALUES (@WorkingTime, @EmployeeId, @EditorId, @IsAutomaticallyCreated, @CreatedAt)";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, record);
				if (affectedRows > 0)
				{
					return (await FetchAllAsync()).Last();
				}
				throw new Exception("Record creation error!");
			}
		}

		public async Task<Record> EditAsync(Record record)
		{
			string query = @"UPDATE Records SET WorkingTime = @WorkingTime, EmployeeId = @EmployeeId, EditorId = @EditorId, IsAutomaticallyCreated = @IsAutomaticallyCreated, CreatedAt = @CreatedAt WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, record);
				if (affectedRows > 0)
				{
					return record;
				}
				throw new Exception("Record editing error!");
			}
		}

		public async Task<IEnumerable<Record>> FetchAllAsync()
		{
			string query = @"SELECT * FROM Records";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<Record>(query);
			}
		}

		public async Task<IEnumerable<Record>> FetchAllUserRecordsAsync(int userId)
		{
			string query = @"SELECT * FROM Records WHERE EmployeeId = @EmployeeId";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<Record>(query, new { EmployeeId = userId });
			}
		}

		public async Task<IEnumerable<Record>> FetchUserRecordsByMonthAsync(int userId, int monthNumber)
		{
			string query = @"SELECT * FROM Records WHERE EmployeeId = @EmployeeId AND MONTH(CreatedAt) = @Month";
			
			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<Record>(query, new { EmployeeId = userId, Month = monthNumber });
			}
		}

		public async Task<Record> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM Records WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var record = await connection.QuerySingleOrDefaultAsync<Record>(query, new { Id = id });
				if (record is not null)
				{
					return record;
				}
				throw new Exception("This record was not found!");
			}
		}

		public async Task<Record> RemoveAsync(int id)
		{
			string query = @"DELETE FROM Records WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var record = await GetByIdAsync(id);
					int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
					if (affectedRows > 0)
					{
						return record;
					}
					throw new Exception("Record removal error!");
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}
	}
}
