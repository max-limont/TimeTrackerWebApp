using GraphQL.Types;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class AuthResponseType : ObjectGraphType<AuthResponse>
	{
		public AuthResponseType()
		{
			Field<StringGraphType, string>().Name("AccessToken").Resolve(context => context.Source.AccessToken);
			Field<StringGraphType, string>().Name("RefreshToken").Resolve(context => context.Source.RefreshToken);
		}		
	}
}
