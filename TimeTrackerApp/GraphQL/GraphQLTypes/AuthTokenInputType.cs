using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class AuthTokenInputType : InputObjectGraphType<AuthenticationToken>
    {
        public AuthTokenInputType()
        {
            Field<IdGraphType, int?>().Name("Id").Resolve(context => context.Source.Id);
            Field<NonNullGraphType<IdGraphType>, int>().Name("UserId").Resolve(context => context.Source.UserId);
            Field<NonNullGraphType<StringGraphType>, string>().Name("Token").Resolve(context => context.Source.Token);
        }
    }
}