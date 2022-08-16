using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes.VacationLevelTypes;

public class VacationLevelInputType:InputObjectGraphType<VacationLevel>
{
    public VacationLevelInputType()
    {
        Field(x =>x.NameLevel);
        Field(x => x.Value);
        Field(x => x.Id);
    }

}