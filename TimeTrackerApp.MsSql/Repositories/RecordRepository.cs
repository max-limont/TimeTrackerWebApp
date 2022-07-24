using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Helpers;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class RecordRepository : IRecordRepository
	{
		private readonly string connectionString;

		public RecordRepository(string conn)
		{
			connectionString = conn;
		}

		public async Task<Record> CreateAsync(Record record)
		{
			string query = @"INSERT INTO Records (WorkingTime, Comment, CreatorId, EditorId, CreatedAt) VALUES (@WorkingTime, @Comment, @CreatorId, @EditorId, @CreatedAt)";

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
			string query = @"UPDATE Records SET WorkingTime = @WorkingTime, Comment = @Comment, CreatorId = @CreatorId, EditorId = @EditorId, CreatedAt = @CreatedAt WHERE Id = @Id";

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
			string query = @"SELECT * FROM Records WHERE UserId = @UserId";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<Record>(query, new { UserId = userId });
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
			string query = @"DELETE FROM Users WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
				if (affectedRows > 0)
				{
					return await GetByIdAsync(id);
				}
				throw new Exception("Record removal error!");
			}
		}
	}
}
