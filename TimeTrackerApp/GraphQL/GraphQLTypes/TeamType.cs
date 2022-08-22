using System.Collections.Generic;
using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes;

public class TeamType:ObjectGraphType<Team>
{
    public TeamType()
    {
        Field(x => x.Id);
        Field(x => x.NameTeam);
        Field<ListGraphType<UserType>, List<User>>().Name("Users").Resolve(context=>context.Source.Users);
    }
}