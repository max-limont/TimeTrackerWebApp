using GraphQL;
using GraphQL.Types;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.MsSql.Repositories;

namespace TimeTrackerApp.GraphQL.GraphQLQueries.RoleQueries;

public class RoleMutation: ObjectGraphType
{
    public RoleMutation(IRoleRepository roleRepository)
    {

        Field<RoleType, Role>()
            .Name("CreateRole")
            .Argument<RoleInputType, Role>("role", "object to add role")
            .ResolveAsync(async context =>
            {
                return await roleRepository.CreateRole(context.GetArgument<Role>("role"));
            });

        Field<RoleType, Role>()
            .Name("UpdateRole")
            .Argument<RoleInputType, Role>("role", "object to update role")
            .ResolveAsync(async context =>
            {
                return await roleRepository.UpdateRole(context.GetArgument<Role>("role"));
            });
        
        
        Field<RoleType, Role>()
            .Name("DeleteRole")
            .Argument<IntGraphType, int>("roleId", "id to delete role")
            .ResolveAsync(async context =>
            {
                return await roleRepository.DeleteRole(context.GetArgument<int>("roleId"));
            });
    }
}