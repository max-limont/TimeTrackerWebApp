using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class AuthTokenType : ObjectGraphType<AuthenticationToken>
    {
        public AuthTokenType()
        {
            Field<NonNullGraphType<IdGraphType>, int>().Name("Id").Resolve(context => context.Source.Id);
            Field<NonNullGraphType<IdGraphType>, int>("UserId").Resolve(context => context.Source.UserId);
            Field<NonNullGraphType<StringGraphType>, string>().Name("Token").Resolve(context => context.Source.Token);
        }
    }
}
