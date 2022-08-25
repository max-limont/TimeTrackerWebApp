using GraphQL.Types;
using System;
using TimeTrackerApp.Business.Enums;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class SickLeaveType : ObjectGraphType<SickLeave>
	{
		public SickLeaveType()
		{
			Field<NonNullGraphType<IdGraphType>, int>().Name("Id").Resolve(context => context.Source.Id);
			Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("StartDate").Resolve(context => context.Source.StartDate);
			Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("EndDate").Resolve(context => context.Source.EndDate);
			Field<NonNullGraphType<IdGraphType>, int>().Name("EmployeeId").Resolve(context => context.Source.EmployeeId);
			Field<IdGraphType, int?>().Name("ApproverId").Resolve(context => context.Source.ApproverId);
			Field<NonNullGraphType<IntGraphType>, SickLeaveStatuses>().Name("Status").Resolve(context => context.Source.Status);
			Field<DateTimeGraphType, DateTime>().Name("CreatedAt").Resolve(context => context.Source.CreatedAt);
		}
	}
}
