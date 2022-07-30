using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class UserLoginType : InputObjectGraphType<UserLogin>
    {
        public UserLoginType()
        {
            Name = "UserLogin";

            Field<NonNullGraphType<StringGraphType>>("email");
            Field<NonNullGraphType<StringGraphType>>("password");

        }
    }
}
