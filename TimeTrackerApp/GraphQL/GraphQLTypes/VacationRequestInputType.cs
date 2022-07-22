using GraphQL.Types;

namespace ToDoList_task.GraphQL.GraphQLTypes
{
    public class VacationRequestInputType : InputObjectGraphType
    {
        public VacationRequestInputType()
        {
            Name = "vacationRequestInput";
            Field<IdGraphType>("id");
            Field<NonNullGraphType<IntGraphType>>("userId");
            Field<NonNullGraphType<DateTimeGraphType>>("stratingTime");
            Field<NonNullGraphType<DateTimeGraphType>>("endingTime");
            Field<StringGraphType>("comment");
        }
    }
}
