using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class ExportUsersType : ObjectGraphType<ExportUserDataItem>
    {
        public ExportUsersType()
        {
            Field<NonNullGraphType<StringGraphType>, string>().Name("Email").Resolve(context => context.Source.Email);
            Field<StringGraphType, string>().Name("FirstName").Resolve(context => context.Source.FirstName);
            Field<StringGraphType, string>().Name("LastName").Resolve(context => context.Source.LastName);
            Field<StringGraphType, string>().Name("WorkType").Resolve(context => context.Source.WorkType);
            Field<IntGraphType, int>().Name("WorkingTime").Resolve(context => context.Source.WorkingTime);
        }
    }
}
