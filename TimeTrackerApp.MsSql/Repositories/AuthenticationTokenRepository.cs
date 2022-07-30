using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class AuthenticationTokenRepository : IAuthenticationTokenRepository
	{
		private readonly string connectionString;

		public AuthenticationTokenRepository(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public async Task<AuthenticationToken> CreateAsync(AuthenticationToken authenticationToken)
		{
			string query = @"INSERT INTO AuthenticationTokens (UserId, Token) VALUES (@UserId, @Token)";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, authenticationToken);
				if (affectedRows > 0)
				{
					return (await FetchAllAsync()).Last();
				}
				throw new Exception("Authentication token creation error!");
			}
		}

		public async Task<AuthenticationToken> EditAsync(AuthenticationToken authenticationToken)
		{
			string query = @"UPDATE AuthenticationTokens SET UserId = @UserId, Token = @Token WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, authenticationToken);
				if (affectedRows > 0)
				{
					return authenticationToken;
				}
				throw new Exception("Authentication token editing error!");
			}
		}

		public async Task<IEnumerable<AuthenticationToken>> FetchAllAsync()
		{
			string query = @"SELECT * FROM AuthenticationTokens";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<AuthenticationToken>(query);
			}
		}

		public async Task<AuthenticationToken> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM AuthenticationTokens WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var authenticationToken = await connection.QuerySingleOrDefaultAsync<AuthenticationToken>(query, new {Id = id});
				if (authenticationToken is not null)
				{
					return authenticationToken;
				}
				throw new Exception("This authentication token was not found!");
			} 
		}

		public async Task<AuthenticationToken> GetByUserIdAsync(int userId)
		{
			string query = @"SELECT * FROM AuthenticationTokens WHERE UserId = @UserId";

			using (var connection = new SqlConnection(connectionString))
			{
				var authenticationToken = await connection.QuerySingleOrDefaultAsync<AuthenticationToken>(query, new { UserId = userId });
				if (authenticationToken is not null)
				{
					return authenticationToken;
				}
				throw new Exception("Authentication token with this user id was not found!");
			}
		}

		public async Task<AuthenticationToken> RemoveAsync(int id)
		{
			string query = @"DELETE FROM AuthenticationTokens WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var authenticationToken = await GetByIdAsync(id);
					int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
					if (affectedRows > 0)
					{
						return authenticationToken;
					}
					throw new Exception("Authentication token removal error!");
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}

		public async Task<AuthenticationToken> RemoveByUserIdAsync(int userId)
		{
			string query = @"DELETE FROM AuthenticationTokens WHERE UserId = @UserId";

			using (var connection = new SqlConnection(connectionString))
			{
				try
				{
					var authenticationToken = await GetByUserIdAsync(userId);
					int affectedRows = await connection.ExecuteAsync(query, new { UserId = userId });
					if (affectedRows > 0)
					{
						return authenticationToken;
					}
					throw new Exception("Authentication token with this user id was not found!");
				}
				catch (Exception exception)
				{
					throw new Exception(exception.Message);
				}
			}
		}
	}
}
