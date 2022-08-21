using System.Data.SqlClient;
using Dapper;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.MsSql.Repositories;

public class RoleRepository:IRoleRepository
{
    private string connectionString { get; set; }
    private SqlConnection Connection {
        get
        {
            return new SqlConnection(connectionString);
        }
    }
    public RoleRepository(string conn)
    {
        connectionString = conn;
    }
    public async Task<List<Role>> GetRoles()
    {
        string query = @"Select * from Role";
        using(Connection)
        {
            var listRoles = await Connection.QueryAsync<Role>(query);
            if (listRoles != null)
            {
                return listRoles.ToList();
            }
            throw new Exception();
        }
    }

    public async Task<Role> GetRoleByUserId(int id)
    {
        string query = @$"Select b.* from Role as b inner join Users U on b.Id = U.RoleId and u.Id = {id}";
        using(Connection)
        {
            var role = await Connection.QueryFirstAsync<Role>(query);
            if (role != null)
            {
                return role;
            }
            throw new Exception();
        }
    }

    public async Task<Role> GetRoleById(int id)
    {
        string query = @$"Select * from Role where Id = {id}";
        using(Connection)
        {
            var role = await Connection.QueryFirstAsync<Role>(query);
            if (role != null)
            {
                return role;
            }
            throw new Exception();
        }
    }

    public async Task<Role> UpdateRole(Role role)
    {
        string query = @"Update Role Set Title=@Title, Value=@Value where Id=@Id";
        using (Connection)
        {
            int result = await Connection.ExecuteAsync(query, role);
            if (result>0)
            {
                return role;
            }
            throw new Exception();
        }
    }

    public async Task<Role> DeleteRole(int id)
    {
        Role model =  await  GetRoleById(id);
        string query = $"Delete from Role where Id ={id}";
        using (var connection = new SqlConnection(connectionString))
        {
            int result = await connection.ExecuteAsync(query);
            if (result > 0)
            {
                return model;
            }
            throw new Exception("Error to delete");
        }
    }

    public async Task<Role> CreateRole(Role team)
    {
        string query = @"Insert Into Role (Title, Value) Values (@Title,@Value) Select @@IDENTITY";
        
        using(Connection)
        {
            int id = await Connection.QueryFirstAsync<int>(query, team);
            if (id != 0)
            {
                return await GetRoleById(id);
            }
            throw new Exception();
        }
    }
}