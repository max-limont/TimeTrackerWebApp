using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.MsSql.Repositories;

public interface IRoleRepository
{
     public Task<List<Role>> GetRoles();
     public Task<Role> GetRoleById(int id);
     public Task<Role> UpdateRole(Role role);
     public Task<Role>  DeleteRole(int id);
     public Task<Role> GetRoleByUserId(int id);
     public Task<Role>  CreateRole(Role role);
}