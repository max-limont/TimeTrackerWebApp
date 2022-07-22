using GraphQL.Types;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
	public class AuthenticationToken
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string TokenId { get; set; } = string.Empty;
	}
	public class AuthTokenType : ObjectGraphType<AuthenticationToken>
    {
        public AuthTokenType()
        {
            Field(x => x.Id, type: typeof(IdGraphType));
            Field(x => x.UserId);
            Field(x => x.TokenId);
        }
    }
}
