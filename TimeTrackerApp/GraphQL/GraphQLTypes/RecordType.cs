using GraphQL.Types;
using System;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class RecordType : ObjectGraphType<Record>
    {
        public RecordType()
        {
            Field<NonNullGraphType<IdGraphType>, int>().Name("Id").Resolve(context => context.Source.Id);
            Field<NonNullGraphType<IntGraphType>, int>().Name("WorkingTime").Resolve(context => context.Source.WorkingTime);
            Field<NonNullGraphType<IdGraphType>, int>().Name("EmployeeId").Resolve(context => context.Source.EmployeeId);
            Field<IdGraphType, int?>().Name("EditorId").Resolve(context => context.Source.EditorId);
            Field<BooleanGraphType, bool>().Name("IsAutomaticallyCreated").Resolve(context => context.Source.IsAutomaticallyCreated);
            Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("CreatedAt").Resolve(context => context.Source.CreatedAt);
        }
    }
}
