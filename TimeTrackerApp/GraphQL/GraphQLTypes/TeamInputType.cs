using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes;

public class TeamInputType:InputObjectGraphType<Team>
{
    public TeamInputType()
    {
        Field(x => x.Id);
        Field(x => x.NameTeam);
    }
}