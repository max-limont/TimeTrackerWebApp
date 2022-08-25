using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes;

public class VacationResponseType:ObjectGraphType<VacationResponse>
{
    public VacationResponseType()
    {
        Field(x => x.Id);
        Field(x => x.Comment);
        Field<UserType, User>().Name("user").Resolve(x=>x.Source.User);
        Field(x => x.VacationId);
        Field(x => x.UserId);
    }
}