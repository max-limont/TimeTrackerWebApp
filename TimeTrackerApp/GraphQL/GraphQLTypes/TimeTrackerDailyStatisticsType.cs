using GraphQL.Types;
using System;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class TimeTrackerDailyStatisticsType : ObjectGraphType<TimeTrackerDailyStatistics>
	{
		public TimeTrackerDailyStatisticsType()
		{
			Field<NonNullGraphType<IntGraphType>, int>().Name("TotalWorkingTime").Resolve(context => context.Source.TotalWorkingTime);
			Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("Date").Resolve(context => context.Source.Date);
		}
	}
}
