using System.Data.SqlClient;
using System.Runtime.CompilerServices;
using Dapper;
using Microsoft.Extensions.Configuration;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories;

public class VacationResponseRepository:IVacationResponse
{
    private string connectionString { get; set; }
    private SqlConnection Connection {
        get
        {
            return new SqlConnection(connectionString);
        }
    }
    
    public VacationResponseRepository(IConfiguration configuration, IVacationRepository vacationRepository)
    {
        connectionString = configuration.GetConnectionString("MsSqlAzure");
    } 
    public Task<VacationResponse> GetVacationResponses()
    {
        throw new NotImplementedException();
    }

    public async Task<VacationResponse> GetVacationResponseById(int id)
    {
        string query = @$"Select * from VacationResponse where  Id={id}";
        using (Connection)
        {
            var vacationResponse = await Connection.QueryFirstAsync<VacationResponse>(query);
            if (vacationResponse != null)
            {
                return vacationResponse;
            }
            throw new Exception();
        }
    }

    public Task<VacationResponse> GetVacationResponsesByUserId(int userId)
    {
        throw new NotImplementedException();
    }

    public async Task<List<VacationResponse>> GetVacationResponsesByVacationId(int vacationId)
    {
        string query = @$"Select * from VacationResponse as v INNER JOIN Users U on U.Id = v.UserId and v.VacationId = {vacationId}";
        using (Connection)
        {
            var vacationResponses = await Connection.QueryAsync<VacationResponse>(query);
            if (vacationResponses != null)
            {
                return vacationResponses.ToList();
            }
            throw new Exception();
        }
    }

    public async Task<VacationResponse> CreateVacationResponse(VacationResponse vacationResponse, bool stateVacation)
    {
        string query = @"Insert Into VacationResponse (VacationId, Comment, UserId) 
              Values (@VacationId, @Comment,@UserId) select  @@IDENTITY";
        using (Connection)
        {
            int id = await Connection.QueryFirstAsync<int>(query,vacationResponse);
            if (id != 0)
            {
                return await GetVacationResponseById(id);
            }
            throw new Exception();
        }
    }

    public async  Task<VacationResponse> RemoveVacationResponse(int id)
    {
        var model = await GetVacationResponseById(id);
        string query = @$"Delete from VacationResponse where Id = {id}";
        using (Connection)
        {
            int affectedRows = await Connection.ExecuteAsync(query);
            if (affectedRows > 0)
            {
                return model;
            }
            throw new Exception();
        }
    }

    public async Task<VacationResponse> UpdateVacationResponse(VacationResponse vacationResponse)
    {
        string query = @"Update VacationResponse set Comment=@Comment where Id = @Id";
        using (Connection)
        {
            var affectedRows = await Connection.ExecuteAsync(query);
            if (affectedRows > 0)
            {
                return await GetVacationResponseById(vacationResponse.Id);
            }

            throw new Exception();
        }
    }
}