using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes;

public class VacationResponseInputType: InputObjectGraphType<VacationResponse>
{
    public VacationResponseInputType()
    {
        Field(x => x.Id);
        Field(x => x.Comment);
        Field(x => x.VacationId);
        Field(x => x.UserId);
    }
}