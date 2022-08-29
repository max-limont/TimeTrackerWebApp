using System;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class TimeTrackerDailyStatistics
	{
		public int TotalWorkingTime { get; set; }
		public DateTime Date { get; set; }
	}
}
