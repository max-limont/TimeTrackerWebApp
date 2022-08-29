using System.Collections.Generic;
using GraphQL;
using GraphQL.Types;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.MsSql.Repositories;

namespace TimeTrackerApp.GraphQL.GraphQLQueries.RoleQueries;

public class RoleQuery: ObjectGraphType
{
    public RoleQuery(IRoleRepository roleRepository)
    {
        Field<ListGraphType<RoleType>, List<Role>>()
            .Name("GetRoles")
            .ResolveAsync(async context =>
            {
                return await roleRepository.GetRoles();
            });

        Field<RoleType, Role>()
            .Name("GetRoleById")
            .Argument<IntGraphType, int>("id","id role")
            .ResolveAsync(async context =>
            {
                var id = context.GetArgument<int>("id");
                return await roleRepository.GetRoleById(id);
            });
        
        Field<RoleType, Role>()
            .Name("GetRoleByUserId")
            .Argument<IntGraphType, int>("userId", "user id")
            .ResolveAsync(async context =>
            {
                return await roleRepository.GetRoleByUserId(context.GetArgument<int>("userId"));
            });
    }
}