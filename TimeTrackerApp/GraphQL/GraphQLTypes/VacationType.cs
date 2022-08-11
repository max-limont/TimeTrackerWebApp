using GraphQL.Types;
using System;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class VacationType : ObjectGraphType<Vacation>
    {
        public VacationType()
        {
            Field<NonNullGraphType<IdGraphType>, int>().Name("Id").Resolve(context => context.Source.Id);
            Field<NonNullGraphType<IdGraphType>, int>().Name("UserId").Resolve(context => context.Source.UserId);
            Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("StartingTime").Resolve(context => context.Source.StartingTime);
            Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("EndingTime").Resolve(context => context.Source.EndingTime);
            Field<StringGraphType, string>().Name("Comment").Resolve(context => context.Source.Comment);
            Field(x => x.IsAccepted,nullable:true);
        }
    }
}
