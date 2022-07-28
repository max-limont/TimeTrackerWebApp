using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class VacationRequestRepository : IVacationRequestRepository
	{
		private readonly string connectionString;

		public VacationRequestRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<VacationRequest> CreateAsync(VacationRequest vacationRequest)
		{
			string query = @"INSERT INTO VacationRequests (UserId, StartingTime, EndingTime, Comment) VALUES (@UserId, @StartingTime, @EndingTime, @Comment)";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, vacationRequest);
				if (affectedRows > 0)
				{
					return (await FetchAllAsync()).Last();
				}
				throw new Exception("Vacation request creation error!");
			}
		}

		public async Task<VacationRequest> EditAsync(VacationRequest vacationRequest)
		{
			string query = @"UPDATE VacationRequests SET UserId = @UserId, StartingTime = @StartingTime, EndingTime = @EndingTime, Comment = @Comment WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, vacationRequest);
				if (affectedRows > 0)
				{
					return vacationRequest;
				}
				throw new Exception("Vacation request editing error!");
			}
		}

		public async Task<IEnumerable<VacationRequest>> FetchAllAsync()
		{
			string query = @"SELECT * FROM VacationRequests";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<VacationRequest>(query);
			}
		}

		public async Task<IEnumerable<VacationRequest>> FetchAllUserVacationRequestsAsync(int userId)
		{
			string query = @"SELECT * FROM VacationRequests WHERE UserId = @UserId";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<VacationRequest>(query, new { UserId = userId });
			}
		}

		public async Task<VacationRequest> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM VacationRequests WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var vacationRequest = await connection.QuerySingleOrDefaultAsync<VacationRequest>(query, new { Id = id });
				if (vacationRequest is not null)
				{
					return vacationRequest;
				}
				throw new Exception("This vacation request was not found");
			}
		}

		public async Task<VacationRequest> RemoveAsync(int id)
		{
			string query = @"DELETE FROM VacationRequests WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
				if (affectedRows > 0)
				{
					return await GetByIdAsync(id);
				}
				throw new Exception("Vacation request removal error!");
			}
		}
	}
}
