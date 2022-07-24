using GraphQL.Types;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class UserInputType : InputObjectGraphType
    {
        public UserInputType()
        {
            Name = "UserInput";
            Field<IdGraphType>("id");
            Field<NonNullGraphType<StringGraphType>>("email");
            Field<StringGraphType>("password");
            Field<StringGraphType>("firstName");
            Field<StringGraphType>("lastName");
            Field<IntGraphType>("weeklyWorkingTime");
            Field<IntGraphType>("remainingVacationDays");
            Field<IntGraphType>("privilegesValue");
        }
    }
}
