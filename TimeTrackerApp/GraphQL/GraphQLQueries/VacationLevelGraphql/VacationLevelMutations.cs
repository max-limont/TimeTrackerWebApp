using GraphQL;
using GraphQL.Types;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.GraphQL.GraphQLTypes.VacationLevelTypes;

namespace TimeTrackerApp.GraphQL.GraphQLQueries.VacationLevelGraphql;

public class VacationLevelMutations:ObjectGraphType
{
    public VacationLevelMutations(IVacationLevelRepository vacationLevelRepository)
    {
        Field<VacationLevelType, VacationLevel>()
            .Name("createVacationLevel")
            .Argument<VacationLevelInputType, VacationLevel>("vacationLevel", "vacation level argumment")
            .ResolveAsync(async context =>
            {
                var model = context.GetArgument<VacationLevel>("vacationLevel");
                return await vacationLevelRepository.CreateVacationLevel(model);
            })
             .AuthorizeWithPolicy("LoggedIn");

        Field<VacationLevelType, VacationLevel>()
            .Name("updateVacationLevel")
            .Argument<VacationLevelInputType, Vacation>("vacationLevel" ,"vacation level argumment")
            .ResolveAsync(async context =>
            {
                var model = context.GetArgument<VacationLevel>("vacationLevel");
                return await vacationLevelRepository.UpdateVacationLevel(model);
            }).AuthorizeWithPolicy("LoggedIn"); ;


        Field<VacationLevelType, VacationLevel>()
            .Name("deleleVacationLevel")
            .Argument<IntGraphType, int>("id", "id for delete")
            .ResolveAsync(async context =>
            {
                int id = context.GetArgument<int>("id");
                return await vacationLevelRepository.RemoveVacationLevel(id);
            }).AuthorizeWithPolicy("LoggedIn"); ;
    }
}