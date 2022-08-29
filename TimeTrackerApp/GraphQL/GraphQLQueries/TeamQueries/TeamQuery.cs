using System.Collections.Generic;
using GraphQL.Types;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.GraphQL.GraphQLTypes;

namespace TimeTrackerApp.GraphQL.GraphQLQueries.TeamQueries;

public class TeamQuery:ObjectGraphType
{
    public TeamQuery(ITeamRepository teamRepository)
    {
        Field<ListGraphType<TeamType>, List<Team>>()
            .Name("fetchTeams")
            .ResolveAsync(async context =>
            {
                return  await  teamRepository.GetTeams();
            });
    }
}