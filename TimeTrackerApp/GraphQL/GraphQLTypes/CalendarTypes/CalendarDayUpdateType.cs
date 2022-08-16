using GraphQL.Types;
using System;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes;

public class CalendarDayUpdateType : InputObjectGraphType<CalendarDay>
{
    public CalendarDayUpdateType()
    {
        Field<NonNullGraphType<IdGraphType>, int>().Name("Id").Resolve(context => context.Source.Id);
        Field<NonNullGraphType<StringGraphType>, string>().Name("Title").Resolve(context => context.Source.Title);
        Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("Date").Resolve(context => context.Source.Date);
        Field<IntGraphType, int?>().Name("DayTypeId").Resolve(context => context.Source.DayTypeId);
        Field<DateTimeGraphType, DateTime?>().Name("EndDate").Resolve(context => context.Source.EndDate);
    }
}