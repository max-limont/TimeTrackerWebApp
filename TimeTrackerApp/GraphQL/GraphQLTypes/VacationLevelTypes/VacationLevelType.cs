using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes.VacationLevelTypes;

public class VacationLevelType : ObjectGraphType<VacationLevel>
{
    public VacationLevelType()
    {
        Field(x => x.Id);
        Field(x => x.NameLevel);
        Field(x => x.Value);
    }
}