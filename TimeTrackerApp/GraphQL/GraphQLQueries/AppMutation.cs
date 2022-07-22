using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using System;

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
            Field<AuthTokenType>(
                "authToken_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<AuthTokenInputType>> { Name = "authToken" }),
                resolve: context =>
                {
                    AuthenticationToken token = context.GetArgument<AuthenticationToken>("authToken");
                    authTokenRep.CreateAsync(token);
                    return token;
                }
            );
            Field<StringGraphType>(
                "authToken_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = Convert.ToInt32(context.Arguments["id"]);
                    if (authTokenRep.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    authTokenRep.RemoveAsync(id);
                    return $"The AuthToken with the id: {id} has been successfully deleted from db.";
                }
            );
            Field<AuthTokenType>(
                "authToken_edit",
                arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<AuthTokenInputType>> { Name = "authToken" }),
                resolve: context =>
                {
                    AuthenticationToken token = context.GetArgument<AuthenticationToken>("authToken");
                    authTokenRep.EditAsync(token);
                    return token;
                }
            );


            Field<RecordType>(
                "record_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<RecordInputType>> { Name = "record" }),
                resolve: context =>
                {
                    Record record = context.GetArgument<Record>("record");
                    recordRep.CreateAsync(record);
                    return record;
                }
            );

            Field<StringGraphType>(
                "record_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = Convert.ToInt32(context.Arguments["id"]);
                    if (recordRep.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    authTokenRep.RemoveAsync(id);
                    return $"The Record with the id: {id} has been successfully deleted from db.";
                }
            );

            Field<RecordType>(
                "record_edit",
                arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<RecordInputType>> { Name = "record" }),
                resolve: context =>
                {
                    Record record = context.GetArgument<Record>("record");
                    recordRep.EditAsync(record);
                    return record;
                }
            );


            Field<UserType>(
                "user_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<UserInputType>> { Name = "user" }),
                resolve: context =>
                {
                    User user = context.GetArgument<User>("user");
                    userRep.CreateAsync(user);
                    return user;
                }
            );

            Field<StringGraphType>(
                "user_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = Convert.ToInt32(context.Arguments["id"]);
                    if (userRep.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    userRep.RemoveAsync(id);
                    return $"The User with the id: {id} has been successfully deleted from db.";
                }
            );

            Field<UserType>(
                "user_edit",
                arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<UserInputType>> { Name = "user" }),
                resolve: context =>
                {
                    User user = context.GetArgument<User>("user");
                    userRep.EditAsync(user);
                    return user;
                }
            );


            Field<VacationRequestType>(
                "vacationRequest_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<VacationRequestInputType>> { Name = "vacationRequest" }),
                resolve: context =>
                {
                    VacationRequest vacationRequest = context.GetArgument<VacationRequest>("vacationRequest");
                    vacationRequestRep.CreateAsync(vacationRequest);
                    return vacationRequest;
                }
            );

            Field<StringGraphType>(
                "vacationRequest_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = Convert.ToInt32(context.Arguments["id"]);
                    if (vacationRequestRep.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    vacationRequestRep.RemoveAsync(id);
                    return $"The VacationRequest with the id: {id} has been successfully deleted from db.";
                }
            );

            Field<RecordType>(
                "vacationRequest_edit",
                arguments: new QueryArguments(
                new QueryArgument<NonNullGraphType<VacationRequestInputType>> { Name = "vacationRequest" }),
                resolve: context =>
                {
                    VacationRequest vacationRequest = context.GetArgument<VacationRequest>("vacationRequest");
                    vacationRequestRep.EditAsync(vacationRequest);
                    return vacationRequest;
                }
            );


        }
    }
}
