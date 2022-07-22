using GraphQL.Types;
using ToDoList_task.GraphQL.GraphQLTypes;
using GraphQL;

namespace ToDoList_task.GraphQL.GraphQLQueries
{
    public class AppMutation : ObjectGraphType
    {
        public AppMutation(
            IAuthenticationTokenRepository authTokenRep,
            IRecordRepository recordRep,
            IUserRepository userRep,
            IVacationRequestRepository vacationRequestRep
        )
        {

        }
    }
}
