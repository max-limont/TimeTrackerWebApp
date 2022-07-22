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
            Field<NonNullGraphType<StringGraphType>>("password");
            Field<StringGraphType>("firstName");
            Field<StringGraphType>("lastName");
            Field<NonNullGraphType<IntGraphType>>("weeklyWorkingTime");
            Field<NonNullGraphType<IntGraphType>>("remainingVacationDays");
            Field<NonNullGraphType<IntGraphType>>("privilegesValue");
            Field<BooleanGraphType>("isComplete");
        }
    }
}
