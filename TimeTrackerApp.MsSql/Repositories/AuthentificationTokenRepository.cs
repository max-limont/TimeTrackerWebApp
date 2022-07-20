using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Helpers;
using Dapper;

namespace TimeTrackerApp.MsSql.Repositories
{
	public class AuthentificationTokenRepository : IAuthentificationTokenRepository
	{
		private readonly string connectionString;

		public AuthentificationTokenRepository(IConfiguration configuration)
		{
			connectionString = configuration.GetConnectionString(ConnectionStrings.MsSqlConnectionString);
		}

		public async Task<AuthentificationToken> CreateAsync(AuthentificationToken authentificationToken)
		{
			string query = @"INSERT INTO AuthentificationTokens (UserId, Token) VALUES (@UserId, @Token)";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, authentificationToken);
				if (affectedRows > 0)
				{
					return (await FetchAllAsync()).Last();
				}
				throw new Exception("Authentification token creation error!");
			}
		}

		public async Task<AuthentificationToken> EditAsync(AuthentificationToken authentificationToken)
		{
			string query = @"UPDATE AuthentificationTokens SET UserId = @UserId, Token = @Token WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, authentificationToken);
				if (affectedRows > 0)
				{
					return authentificationToken;
				}
				throw new Exception("Authentification token editing error!");
			}
		}

		public async Task<IEnumerable<AuthentificationToken>> FetchAllAsync()
		{
			string query = @"SELECT * FROM AuthentificationTokens";

			using (var connection = new SqlConnection(connectionString))
			{
				return await connection.QueryAsync<AuthentificationToken>(query);
			}
		}

		public async Task<AuthentificationToken> GetByIdAsync(int id)
		{
			string query = @"SELECT * FROM AuthentificationTokens WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				var authentificationToken = await connection.QuerySingleOrDefaultAsync<AuthentificationToken>(query, new {Id = id});
				if (authentificationToken is not null)
				{
					return authentificationToken;
				}
				throw new Exception("This authentification token was not found!");
			} 
		}

		public async Task<AuthentificationToken> RemoveAsync(int id)
		{
			string query = @"DELETE FROM AuthentificationTokens WHERE Id = @Id";

			using (var connection = new SqlConnection(connectionString))
			{
				int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
				if (affectedRows > 0)
				{
					return await GetByIdAsync(id);
				}
				throw new Exception("Authentification token removal error!");
			}
		}
	}
}
