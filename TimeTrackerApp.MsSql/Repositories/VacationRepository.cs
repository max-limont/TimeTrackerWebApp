using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class VacationRepository : IVacationRepository
	{
		private readonly string connectionString;

		public VacationRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<Vacation> CreateAsync(Vacation vacation)
		{
			string query = @"INSERT INTO Vacation (UserId, StartingTime, EndingTime, Comment) VALUES (@UserId, @StartingTime, @EndingTime, @Comment)";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, vacation);
				if (affectedRows > 0)
				{
					return (await FetchAllAsync()).Last();
				}
				throw new Exception("Vacation request creation error!");
			}
		}

		public async Task<Vacation> EditAsync(Vacation vacation)
		{
			string query = @"UPDATE Vacation SET UserId = @UserId,IsAccepted=@IsAccepted, StartingTime = @StartingTime, EndingTime = @EndingTime, Comment = @Comment WHERE Id = @Id;
              Select * from Vacation as b Inner Join Users as u on b.UserId=u.Id and b.Id=@Id and u.Id=@UserId";

			using (var connection = new SqlConnection(connectionString))
			{
				var  model  = await connection.QueryAsync<Vacation, User, Vacation>(query, (c, d) =>
				{
					c.User = d;
					return c;
				}, vacation , splitOn: "Id");
				if (model !=  null)
				{
					return model.First();
				}
				throw new Exception("Vacation request editing error!");
			}
	 	}

		public async Task<List<Vacation>> FetchAllAsync()
		{
			string query = @"SELECT * FROM Vacation";

			using (var connection = new SqlConnection(connectionString))
			{
				return (await connection.QueryAsync<Vacation>(query)).ToList();
			}
		}
		
		public async Task<Vacation> ChangeAcceptedState(int id, bool stateAccept)
		{
			string query = @"Update Vacation set IsAccepted=@StateAccepted Where Id=@Id";
			using (var connection = new SqlConnection(connectionString))
			{
				int result = await connection.ExecuteAsync(query, new { Id = id, StateAccept = stateAccept });
				if (result == 0)
				{
					throw new Exception();
				}
				return await GetByIdAsync(id);
			}   
		}

		public async Task<IEnumerable<Vacation>> FetchAllUserVacationAsync(int userId)
		{
			string query = @"SELECT * FROM Vacation WHERE UserId = @UserId";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<Vacation>(query, new { UserId = userId });
			}
		}

		public async Task<Vacation> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM Vacation WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var vacationRequest = await connection.QuerySingleOrDefaultAsync<Vacation>(query, new { Id = id });
				if (vacationRequest is not null)
				{
					return vacationRequest;
				}
				throw new Exception("This vacation request was not found");
			}
		}

		public async Task<List<Vacation>> GetRequestVacation(int receiverUserId)
		{
			string query = @$"
			SELECT  * from Vacation as c Inner Join Users as d on c.UserId=d.Id and c.IsAccepted IS NULL  and UserId in
            (Select b.id from Users as b where b.VacationPermissionId in (select id from VacationLevel as vl where vl.Value <
            (Select Value From VacationLevel as vl2 Where vl2.Id = (Select VacationPermissionId from Users Where Id={receiverUserId}))))";

			using (var connection = new SqlConnection(connectionString))
			{
				var listVacation = await connection.QueryAsync<Vacation,User,Vacation>(query, (c, d) =>
					{
						c.User = d;
						return c;
					},
					splitOn: "Id");
				
				if (listVacation != null)
				{
					return listVacation.ToList();
				}
				throw new Exception("error to fetch");
			}
		}

		public async Task<Vacation> RemoveAsync(int id)
		{
			string query = @"DELETE FROM Vacation WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var vacationRequest = await GetByIdAsync(id);
					int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
					if (affectedRows > 0)
					{
						return vacationRequest;
					}
					throw new Exception("Vacation request removal error!");
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}
	}
}
