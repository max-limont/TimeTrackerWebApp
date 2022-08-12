
using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes;


/*need to refactor and merge with class CalendarInputType*/
public class CalendarUpdateType:InputObjectGraphType<Calendar>
{
    public CalendarUpdateType()
    {
        Field(x => x.Id, nullable: false);
        Field(x => x.Title, nullable: false);
        Field(x => x.Date, nullable: false);
        Field(x => x.TypeDayId, nullable: true);
        Field(x => x.EndDate, nullable: true);
    }
}