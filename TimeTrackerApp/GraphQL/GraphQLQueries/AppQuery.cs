using GraphQL.Types;
using ToDoList_task.GraphQL.GraphQLTypes;
using GraphQL;

namespace ToDoList_task.GraphQL.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(
            IAuthenticationTokenRepository authTokenRep,
            IRecordRepository recordRep,
            IUserRepository userRep,
            IVacationRequestRepository vacationRequestRep
        )
        {
            
        }
    }
}
