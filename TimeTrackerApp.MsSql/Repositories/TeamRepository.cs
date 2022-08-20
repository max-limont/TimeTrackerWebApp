using System.Data.SqlClient;
using Dapper;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories;

public class TeamRepository:ITeamRepository
{
    private string connectionString { get; set; }

    public TeamRepository(string conn)
    {
        connectionString = conn;
    }
    public SqlConnection Connection {
        get
        {
            return new SqlConnection(connectionString);
        }
    }

    public async  Task<List<Team>> GetTeams()
    {
        string query = "select * from TeamTable";
        using (var connection = new SqlConnection(connectionString))
        {
            var listModels = await connection.QueryAsync<Team>(query);
            if (listModels != null)
            {
                return listModels.ToList();
            }
            throw new Exception();
        }
    }

    public async Task<Team> GetTeamById(int id)
    {
        string query = $"select * from TeamTable where Id = {id}";
        using (var connection = new SqlConnection(connectionString))
        {
            var team =  await connection.QueryFirstAsync<Team>(query);
            if (team != null)
            {
                return team;
            }
            throw new Exception();
        } 
    }

    public async Task<Team>  UpdateTeam(Team team)
    {
        string query = @"Update TeamTable Set NameTeam=@NameTeam where Id=@Id";
        using (Connection)
        {
            int result = await Connection.ExecuteAsync(query, team);
            if (result>0)
            {
                return team;
            }
            throw new Exception();
        }
    }

    public async  Task<Team>  DeleteTeam(int id)
    {
        Team model =  await  GetTeamById(id);
        string query = $"Delete from TeamTable where Id ={id}";
        using (var connection = new SqlConnection(connectionString))
        {
            int result = await connection.ExecuteAsync(query);
            if (result > 0)
            {
                return model;
            }

            throw new Exception("Error to delete ");
        }
    }

    public async Task<Team>  CreateTeam(Team team)
    {
        string query = @"Insert Into TeamTable (NameTeam) Values (@NameTeam) Select @@IDENTITY";
        
        using(Connection)
        {
            int id = await Connection.QueryFirstAsync<int>(query, team);
            if (id != 0)
            {
                return await GetTeamById(id);
            }
            throw new Exception();
        }
    }
}