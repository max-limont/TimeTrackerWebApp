using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes
{
    public class CalendarInputType :InputObjectGraphType<Calendar>
    {

            public CalendarInputType()
            {
                Field(x => x.Title, nullable: false);
                Field(x => x.Date, nullable: false);
                Field(x => x.TypeDayId, nullable: true);
           }

        }
    }

