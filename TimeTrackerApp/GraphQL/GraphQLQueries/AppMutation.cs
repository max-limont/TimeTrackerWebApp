using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
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
