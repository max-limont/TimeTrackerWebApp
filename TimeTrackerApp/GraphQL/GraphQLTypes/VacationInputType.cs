using GraphQL.Types;
using System;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class VacationInputType : InputObjectGraphType<Vacation>
    {
        public VacationInputType()
        {
            Field(x => x.Comment,nullable:true);
            Field(x => x.EndingTime);
            Field(x => x.StartingTime);
            Field(x => x.UserId);
            Field(x => x.Id);
            Field(x => x.IsAccepted, nullable:true);
        }
    }
}
