using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes;

public class RoleInputType:InputObjectGraphType<Role>
{
    public RoleInputType()
    {
        Field(x=>x.Id);
        Field(x=>x.Title);
        Field(x=>x.Value);
    }
}