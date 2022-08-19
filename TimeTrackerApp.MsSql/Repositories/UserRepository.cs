using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly string connectionString;

		public UserRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<User> ChangePassword(int id, string password)
		{
			string query = "UPDATE Users SET Password = @Password WHERE Id = @Id";
			try
			{
				using (var connection = new SqlConnection(connectionString))
				{
					int affectedRows = await connection.ExecuteAsync(query, new { Id = id, Password = PasswordService.Encrypt(password) });
					if (affectedRows > 0)
					{
						return await GetByIdAsync(id);
					}
					throw new Exception("Password changing error!");
				}
			} 
			catch (Exception exception)
			{
				throw new Exception(exception.Message);
			}
		}

		public async Task<User> CreateAsync(User user)
		{
			string query = @"INSERT INTO Users (Email, Password, FirstName, LastName, IsFullTimeEmployee, WeeklyWorkingTime, RemainingVacationDays, PrivilegesValue, VacationPermissionId) VALUES (@Email, @Password, @FirstName, @LastName, @IsFullTimeEmployee, @WeeklyWorkingTime, @RemainingVacationDays, @PrivilegesValue, @VacationPermissionId)";
			using (var connection = new SqlConnection(connectionString))
			{
				user.Password = PasswordService.Encrypt(user.Password);
				int affectedRows = await connection.ExecuteAsync(query, user);
				if (affectedRows > 0)
				{
					return (await FetchAllAsync()).Last();
				}
				throw new Exception("User creation error!"); 
			}
		}

		public async Task<User> EditAsync(User user)
		{
			string query = @"UPDATE Users SET Email = @Email, FirstName = @FirstName, LastName = @LastName, IsFullTimeEmployee = @IsFullTimeEmployee, WeeklyWorkingTime = @WeeklyWorkingTime, RemainingVacationDays = @RemainingVacationDays, PrivilegesValue = @PrivilegesValue, VacationPermissionId = @VacationPermissionId WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, user);
				if (affectedRows > 0)
				{
					return user;
				}
				throw new Exception("User editing error!");
			}
		}

		public async Task<IEnumerable<User>> FetchAllAsync()
		{
			string query = @"SELECT * FROM Users";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<User>(query);
			}
		}

		public async Task<IEnumerable<User>> FetchPageListAsync(int from, int contentPerPage, string orderBy = "FirstName", bool isReverse = false)
		{
			orderBy += isReverse ? " DESC" : " ASC";
			string query = $"SELECT * FROM Users ORDER BY {orderBy} OFFSET @From ROWS FETCH NEXT @ContentPerPage ROWS ONLY";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<User>(query, new { From = from, ContentPerPage = contentPerPage });
			}
		}

		public async Task<IEnumerable<User>> FetchSearchListAsync(string request)
		{
			string query = @"SELECT * FROM Users WHERE (LastName LIKE '@Request%') OR (FirstName LIKE '@Request%') OR (Email LIKE '@Request%')";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<User>(query, new { Request = request });
			}
		}

		public async Task<int> GetCountAsync()
		{
			string query = "SELECT COUNT(*) FROM Users";
			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QuerySingleOrDefaultAsync<int>(query);
			}
		}

		public async Task<User> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM Users WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { Id = id });
				if (user is not null)
				{
					return user;
				}
				throw new Exception("This user was not found!");
			}
		}

		public async Task<User> GetByEmailAsync(string email)
		{
			string query = @"SELECT * FROM Users WHERE Email = @Email";

			using (var connection = new SqlConnection(connectionString))
			{
				var user = await connection.QuerySingleOrDefaultAsync<User>(query, new { Email = email });
				if (user is not null)
				{
					return user;
				}
				throw new Exception("User with this email was not found!");
			}
		}

		public async Task<User> RemoveAsync(int id)
		{
			string query = @"DELETE FROM Users WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var user = await GetByIdAsync(id);
					int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
					if (affectedRows > 0)
					{
						return user;
					}
					throw new Exception("User removal error!");
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}
	}
}
