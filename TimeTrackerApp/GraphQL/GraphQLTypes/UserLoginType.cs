using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class UserLoginType : InputObjectGraphType<UserLogin>
    {
        public UserLoginType()
        {
            Field<NonNullGraphType<StringGraphType>, string>().Name("Email").Resolve(context => context.Source.Email);
            Field<NonNullGraphType<StringGraphType>, string>().Name("Password").Resolve(context => context.Source.Password);
        }
    }
}
