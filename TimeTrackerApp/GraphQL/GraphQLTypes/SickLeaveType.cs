using GraphQL.Types;
using System;
using TimeTrackerApp.Business.Enums;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class SickLeaveType : ObjectGraphType<SickLeave>
	{
		public SickLeaveType(IUserRepository userRepository)
		{
			Field<NonNullGraphType<IdGraphType>, int>().Name("Id").Resolve(context => context.Source.Id);
			Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("StartDate").Resolve(context => context.Source.StartDate);
			Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("EndDate").Resolve(context => context.Source.EndDate);
			Field<NonNullGraphType<IdGraphType>, int>().Name("EmployeeId").Resolve(context => context.Source.EmployeeId);
			Field<IdGraphType, int?>().Name("ApproverId").Resolve(context => context.Source.ApproverId);
			Field<IntGraphType, int?>().Name("Status").Resolve(context => (int)context.Source.Status);
			Field<DateTimeGraphType, DateTime>().Name("CreationDateTime").Resolve(context => context.Source.CreationDateTime);
			Field<UserType, User>().Name("Employee").ResolveAsync(async context => {
				try
				{
					return await userRepository.GetByIdAsync(context.Source.EmployeeId);
				}
				catch
				{
					return null;
				}
			});
			Field<UserType, User>().Name("Approver").ResolveAsync(async context => {
				try
				{
					return await userRepository.GetByIdAsync(context.Source.ApproverId ?? 0);
				}
				catch
				{
					return null;
				}
			});
		}
	}
}
