using Dapper;
using Microsoft.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories;

public class UserManagementRepository : IUserManagement
{
    private string connectionString { get; set; }

    private SqlConnection Connection
    {
        get { return new SqlConnection(connectionString); }
    }

    public UserManagementRepository(string conn)
    {
        connectionString = conn;
    }

    public async Task<VacationManagement?> GetByIdVacationManagent(int id)
    {
        string query = @$"Select * from UserManagement where Id={id}";
        using (Connection)
        {
            var model = await Connection.QueryFirstOrDefaultAsync<VacationManagement>(query);
            return model;
        }
    }

    public async Task<List<VacationManagement>> GetByUserIdVacationManagment(int userId)
    {
        string query = @$"Select * from UserManagement where EmployeeId ={userId}";
        using (Connection)
        {
            var model = await Connection.QueryAsync<VacationManagement>(query);
            return model.ToList();
        }
    }

    public async Task<VacationManagement> UpdateVacationManagment(VacationManagement model)
    {
        string query = @" Update UserManagement  Set EmployeeId=@EmployeeId, ManagerId=@ManagerId where Id = @Id";
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

    public async Task<VacationManagement> DeleteVacationManagment(int id)
    {
        var model = await GetByIdVacationManagent(id);
        string query = @$"Delete From UserManagement where Id={id}";
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

    public async Task<VacationManagement> CreateVacationManagment(VacationManagement model)
    {
        string query =
            @" Insert into UserManagement (EmployeeId, ManagerId) Values (@EmployeeId,@ManagerId) select @@INDENTITY";
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