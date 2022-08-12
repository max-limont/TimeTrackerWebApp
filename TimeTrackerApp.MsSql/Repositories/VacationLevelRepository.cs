using Dapper;
using Microsoft.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories;

public class VacationLevelRepository:IVacationLevelRepository
{
    private readonly string connectionString;
    public VacationLevelRepository(string connectionString)
    {
        this.connectionString = connectionString;
    }
    
    public async Task<VacationLevel> CreateVacationLevel(VacationLevel model)
    {
        string query = @"Insert Into VacationLevel  (NameLevel, Value) VALUES (@NameLevel, @Value) select @@Identity";
        using (var connection = new SqlConnection(connectionString))
        {
            int id = await connection.QueryFirstAsync<int>(query, model);
            if (id != 0)
            {
                return await GetVacationLevelById(id);
            }
            throw new Exception("Error to Create!");
        }
    }

    public async Task<List<VacationLevel>> GetVacationLevels()
    {
        string query = @"Select * from VacationLevel";
        using (var connection = new SqlConnection(connectionString))
        {
            var vacationLevels = await connection.QueryAsync<VacationLevel>(query);
            if (vacationLevels != null)
            {
                return vacationLevels.ToList();
            }
            throw new Exception("Error to fetch list of Vacation levels!");
        }
    }

    public async Task<VacationLevel> UpdateVacationLevel(VacationLevel model)
    {
        string query = @"Update VacationLevel Set NameLevel=@NameLevel, Value=@Value"; 
        using (var connection = new SqlConnection(connectionString))
        {
            int result = await connection.ExecuteAsync(query, model);
            if (result > 0)
            {
                return model;
            }
            throw new Exception("Error to update Vacation Level");
        }
    }

    public async Task<VacationLevel> RemoveVacationLevel(int id)
    {
        string query = @"Delele From VacationLevel Where Id=@id";
        using (var connection = new SqlConnection(connectionString))
        {
            var deletedModel = await GetVacationLevelById(id);
            int result = await connection.ExecuteAsync(query,new{ id = id});
            if(result>0)
            {
                return deletedModel;
            }
            throw new Exception("Error to delete vacation level");
        }
    }

    public async  Task<VacationLevel> GetVacationLevelById(int id)
    {
        string query = @"select * from  VacationLevel where Id=@id";
        using (var connection = new SqlConnection(connectionString))
        {
            var model = await  connection.QueryFirstAsync<VacationLevel>(query, new { id = id });
            if(model != null)
            {
                return model;
            }
        }
        throw new Exception("Error to get by id");
    }
}