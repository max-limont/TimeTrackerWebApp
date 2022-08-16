using System.Collections.Generic;
using GraphQL;
using GraphQL.Types;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.GraphQL.GraphQLTypes.VacationLevelTypes;

namespace TimeTrackerApp.GraphQL.GraphQLQueries.VacationLevelGraphql;

public class VacationLevelQueries:ObjectGraphType
{
    public VacationLevelQueries(IVacationLevelRepository vacationLevelRepository) 
    {
        Field<ListGraphType<VacationLevelType>,List<VacationLevel>>()
            .Name("getAllVacationsLevel")
            .ResolveAsync(async context =>
            {
                return await vacationLevelRepository.GetVacationLevels();
            })
             .AuthorizeWithPolicy("LoggedIn"); ;

        Field<VacationLevelType, VacationLevel>()
            .Name("getVacationLevelById")
            .Argument<IntGraphType, int>("id", "id to find vacation level")
            .ResolveAsync(async context =>
            {
                int id = context.GetArgument<int>("id");
                return await vacationLevelRepository.GetVacationLevelById(id);
            })
             .AuthorizeWithPolicy("LoggedIn"); ;
    }
    
}