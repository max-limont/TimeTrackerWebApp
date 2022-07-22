using GraphQL.Types;
using TimeTrackerApp.Business.Models;

namespace ToDoList_task.GraphQL.GraphQLTypes
{
    public class VacationRequestType : ObjectGraphType<VacationRequest>
    {
        public VacationRequestType()
        {
            Field(x => x.Id, type: typeof(IdGraphType));
            Field(x => x.UserId);
            Field(x => x.StartingTime);
            Field(x => x.EndingTime);
            Field(x => x.Comment);
        }
    }
}
