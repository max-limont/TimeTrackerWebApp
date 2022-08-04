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
            Field<NonNullGraphType<IdGraphType>, int>().Name("CreatorId").Resolve(context => context.Source.CreatorId);
            Field<IdGraphType, int?>().Name("EditorId").Resolve(context => context.Source.EditorId);
            Field<StringGraphType, string>().Name("Comment").Resolve(context => context.Source.Comment);
            Field<NonNullGraphType<DateTimeGraphType>, DateTime>().Name("CreatedAt").Resolve(context => context.Source.CreatedAt);
        }
    }
}
