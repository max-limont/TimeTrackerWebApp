using GraphQL.Types;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class RecordInputType : InputObjectGraphType
    {
        public RecordInputType()
        {
            Name = "recordInput";
            Field<IdGraphType>("id");
            Field<NonNullGraphType<IntGraphType>>("workingTime");
            Field<NonNullGraphType<IntGraphType>>("creatorId");
            Field<IntGraphType>("editorId");
            Field<NonNullGraphType<DateTimeGraphType>>("createdAt");
            Field<StringGraphType>("comment");
        }
    }
}