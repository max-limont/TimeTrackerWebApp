using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes;

public class RoleType:ObjectGraphType<Role>
{
    public RoleType()
    {
        Field(x => x.Id);
        Field(x => x.Title);
        Field(x => x.Value);
    }
}