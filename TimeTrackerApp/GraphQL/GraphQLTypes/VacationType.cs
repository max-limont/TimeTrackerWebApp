using GraphQL.Types;
using System;
using System.Collections.Generic;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.GraphQL.GraphQLTypes
{
    public class VacationType : ObjectGraphType<Vacation>
    {
        public VacationType()
        {
            Field(x => x.Id, nullable: false);
            Field(x => x.Comment,nullable:true);
            Field(x => x.EndingTime, nullable: false);
            Field(x => x.StartingTime, nullable: false);
            Field(x => x.UserId,nullable: false);
            Field(x => x.IsAccepted,nullable:true);
            Field<UserType, User>().Name("User").Resolve(context=>context.Source.User);
            Field<ListGraphType<UserType>, List<User>>().Name("approvers").Resolve(context=>context.Source.ApproveUsers);
            Field<VacationResponseType, VacationResponse>().Name("vacationResponse")
                .Resolve(x => x.Source.VacationResponse);
        }
    }
}
