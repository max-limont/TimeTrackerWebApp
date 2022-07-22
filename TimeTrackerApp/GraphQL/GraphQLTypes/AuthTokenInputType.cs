using GraphQL.Types;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class AuthTokenInputType : InputObjectGraphType
    {
        public AuthTokenInputType()
        {
            Name = "authTokenInput";
            Field<IdGraphType>("id");
            Field<NonNullGraphType<IntGraphType>>("userId");
            Field<NonNullGraphType<StringGraphType>>("tokenId");
        }
    }
}
