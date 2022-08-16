using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class UserInputType : InputObjectGraphType<User>
    {
        public UserInputType()
        {
            Field<NonNullGraphType<StringGraphType>, string>().Name("Email").Resolve(context => context.Source.Email);
            Field<NonNullGraphType<StringGraphType>, string>().Name("Password").Resolve(context => context.Source.Password);
            Field<StringGraphType, string>().Name("FirstName").Resolve(context => context.Source.FirstName);
            Field<StringGraphType, string>().Name("LastName").Resolve(context => context.Source.LastName);
            Field<IntGraphType, int?>().Name("WeeklyWorkingTime").Resolve(context => context.Source.WeeklyWorkingTime);
            Field<IntGraphType, int?>().Name("RemainingVacationDays").Resolve(context => context.Source.RemainingVacationDays);
            Field<IntGraphType, int?>().Name("PrivilegesValue").Resolve(context => context.Source.PrivilegesValue);
        }
    }
}
