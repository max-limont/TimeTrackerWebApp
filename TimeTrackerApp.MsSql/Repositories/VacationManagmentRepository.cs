using Dapper;
using Microsoft.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories;

public class VacationManagmentRepository : IVacationManagment
{
    private string connectionString { get; set; }

    private SqlConnection Connection
    {
        get { return new SqlConnection(connectionString); }
    }

    public VacationManagmentRepository(string conn)
    {
        connectionString = conn;
    }

    public async Task<VacationManagment?> GetByIdVacationManagent(int id)
    {
        string query = @$"Select * from UserManagment where Id={id}";
        using (Connection)
        {
            var model = await Connection.QueryFirstOrDefaultAsync<VacationManagment>(query);
            return model;
        }
    }

    public async Task<List<VacationManagment>> GetByUserIdVacationManagment(int userId)
    {
        string query = @$"Select * from UserManagment where UserId ={userId}";
        using (Connection)
        {
            var model = await Connection.QueryAsync<VacationManagment>(query);
            return model.ToList();
        }
    }

    public async Task<VacationManagment> UpdateVacationManagment(VacationManagment model)
    {
        string query = @" Update UserManagment  Set EmployeeId=@EmployeeId, ManagerId=@ManagerId where Id = @Id";
        using (var connection = new SqlConnection(connectionString))
        {
            var result = await connection.ExecuteAsync(query, model);
            if (result > 0)
            {
                return model;
            }
        }

        throw new Exception();
    }

    public async Task<VacationManagment> DeleteVacationManagment(int id)
    {
        var model = await GetByIdVacationManagent(id);
        string query = @$"Delete From UserManagment where Id={id}";
        using (Connection)
        {
            int result = await Connection.ExecuteAsync(query);
            if (result > 0)
            {
                return model;
            }

            throw new Exception();
        }
    }

    public async Task<VacationManagment> CreateVacationManagment(VacationManagment model)
    {
        string query =
            @" Insert into UserManagment (EmployeeId, ManagerId) Values (@EmployeeId,@ManagerId) select @@INDENTITY";
        using (Connection)
        {
            var id = await Connection.QueryFirstAsync<int>(query, model);
            if (id != 0)
            {
                return await GetByIdVacationManagent(id);
            }

            throw new Exception();
        }
    }
}