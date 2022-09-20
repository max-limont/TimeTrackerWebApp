using Dapper;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class SickLeaveRepository : ISickLeaveRepository
	{
		private readonly string connectionString;

		public SickLeaveRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<SickLeave> CreateAsync(SickLeave sickLeave)
		{
			string query = @"INSERT INTO SickLeaves(StartDate, EndDate, EmployeeId, ApproverId, Status, CreationDateTime) VALUES (@StartDate, @EndDate, @EmployeeId, @ApproverId, @Status, @CreationDateTime) SELECT @@IDENTITY";

			using (var connection = new SqlConnection(connectionString))
			{
				var id = await connection.QuerySingleOrDefaultAsync<int>(query, sickLeave);
				if (id != 0)
				{
					try
					{
						return await GetByIdAsync(id);
					}
					catch (Exception exception)
					{
						throw new Exception(exception.Message);
					}
				}
				throw new Exception("Sick leave creation error!");
			}
		}

		public async Task<SickLeave> EditAsync(SickLeave sickLeave)
		{
			string query = @"UPDATE SickLeaves SET StartDate = @StartDate, EndDate = @EndDate, EmployeeId = @EmployeeId, ApproverId = @ApproverId, Status = @Status, CreationDateTime = @CreationDateTime WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var affectedRows = await connection.ExecuteAsync(query, sickLeave);
				if (affectedRows > 0)
				{
					return sickLeave;
				}
				throw new Exception("Sick leave editing error!");
			}
		}

		public async Task<IEnumerable<SickLeave>> FetchAllAsync()
		{
			string query = @"SELECT * FROM SickLeaves ORDER BY CreationDateTime DESC";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<SickLeave>(query);
			}
		}

		public async Task<IEnumerable<SickLeave>> FetchAllByEmployeeIdAsync(int employeeId)
		{
			string query = @"SELECT * FROM SickLeaves WHERE EmployeeId = @EmployeeId ORDER BY CreationDateTime DESC";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<SickLeave>(query, new { EmployeeId = employeeId });
			}
		}

		public async Task<IEnumerable<SickLeave>> FetchAllForManagerByManagerIdAsync(int managerId)
		{
			string query = @"SELECT SickLeaves.* FROM SickLeaves LEFT JOIN UserManagement ON SickLeaves.EmployeeId = UserManagement.EmployeeId WHERE UserManagement.ManagerId = @ManagerId ORDER BY SickLeaves.CreationDateTime DESC";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<SickLeave>(query, new { ManagerId = managerId });
			}
		}

		public async Task<SickLeave> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM SickLeaves WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var sickLeave = await connection.QuerySingleOrDefaultAsync<SickLeave>(query, new { Id = id });
				if (sickLeave is not null)
				{
					return sickLeave;
				}
				throw new Exception("Sick leave with this id was not found!");
			}
		}

		public async Task<SickLeave> RemoveAsync(int id)
		{
			string query = @"DELETE FROM SickLeaves WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var sickLeave = await GetByIdAsync(id);
					var affectedRows = await connection.ExecuteAsync(query, new { Id = id });
					if (affectedRows > 0)
					{
						return sickLeave;
					}
					throw new Exception("Sick leave removal error!");
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}
	}
}
