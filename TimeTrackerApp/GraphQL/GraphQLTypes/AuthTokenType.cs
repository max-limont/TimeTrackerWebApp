using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class AuthTokenType : ObjectGraphType<AuthenticationToken>
    {
        public AuthTokenType()
        {
            Field(x => x.Id, type: typeof(IdGraphType));
            Field(x => x.UserId);
            Field(x => x.Token);
        }
    }
}
