using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Services;

using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppMutation : ObjectGraphType
    {
        public AppMutation(ICalendarRepository calendarRepository,IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRequestRepository vacationRequestRepository)
        {
            var authenticationService = new AuthenticationService(userRepository, authenticationTokenRepository);

            Field<UserType, User>()
                .Name("CreateUser")
                .Argument<NonNullGraphType<UserInputType>, User>("User", "User")
                .ResolveAsync(async context =>
                {
                    var user = context.GetArgument<User>("User");
                    return await userRepository.CreateAsync(user);
                });

            Field<UserType, User>()
                .Name("DeleteUser")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await userRepository.RemoveAsync(id);
                });

            Field<UserType, User>()
                .Name("EditUser")
                .Argument<NonNullGraphType<UserInputType>, User>("User", "User")
                .ResolveAsync(async context =>
                {
                    var user = context.GetArgument<User>("User");
                    return await userRepository.EditAsync(user);
                });

            Field<UserType, User>()
                .Name("ChangeUserPassword")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .Argument<NonNullGraphType<StringGraphType>, string>("Password", "New user password")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    string password = context.GetArgument<string>("Password");
                    return await userRepository.ChangePassword(id, password);
                });

            Field<RecordType, Record>()
                .Name("CreateRecord")
                .Argument<NonNullGraphType<RecordInputType>, Record>("Record", "Record")
                .ResolveAsync(async context =>
                {
                    var record = context.GetArgument<Record>("Record");
                    return await recordRepository.CreateAsync(record);
                });

            Field<RecordType, Record>()
                .Name("EditRecord")
                .Argument<NonNullGraphType<RecordInputType>, Record>("Record", "Record")
                .ResolveAsync(async context =>
                {
                    var record = context.GetArgument<Record>("Record");
                    return await recordRepository.EditAsync(record);
                });

            Field<RecordType, Record>()
                .Name("DeleteRecord")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Record id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await recordRepository.RemoveAsync(id);
                });

            Field<VacationRequestType, VacationRequest>()
                .Name("CreateVacationRequest")
                .Argument<NonNullGraphType<VacationRequestInputType>, VacationRequest>("VacationRequest", "Vacation request")
                .ResolveAsync(async context =>
                {
                    var vacationRequest = context.GetArgument<VacationRequest>("VacationRequest");
                    return await vacationRequestRepository.CreateAsync(vacationRequest);
                });

            Field<VacationRequestType, VacationRequest>()
                .Name("EditVacationRequest")
                .Argument<NonNullGraphType<VacationRequestInputType>, VacationRequest>("VacationRequest", "Vacation request")
                .ResolveAsync(async context =>
                {
                    var vacationRequest = context.GetArgument<VacationRequest>("VacationRequest");
                    return await vacationRequestRepository.EditAsync(vacationRequest);
                });
            
            Field<VacationRequestType, VacationRequest>()
                .Name("DeleteVacationRequest")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Vacation request")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await vacationRequestRepository.RemoveAsync(id);
                });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("CreateAuthenticationToken")
                .Argument<NonNullGraphType<AuthTokenInputType>, AuthenticationToken>("AuthToken", "Authentication token")
                .ResolveAsync(async context =>
                {
                    var authenticationToken = context.GetArgument<AuthenticationToken>("AuthToken");
                    return await authenticationTokenRepository.CreateAsync(authenticationToken);
                });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("EditAuthenticationToken")
                .Argument<NonNullGraphType<AuthTokenInputType>, AuthenticationToken>("AuthToken", "Authentication token")
                .ResolveAsync(async context =>
                {
                    var authenticationToken = context.GetArgument<AuthenticationToken>("AuthToken");
                    return await authenticationTokenRepository.EditAsync(authenticationToken);
                });

            Field<AuthTokenType, AuthenticationToken>()
               .Name("DeleteAuthenticationToken")
               .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Authentication token id")
               .ResolveAsync(async context =>
               {
                   int id = context.GetArgument<int>("Id");
                   return await authenticationTokenRepository.RemoveAsync(id);
               });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("DeleteAuthenticationTokenByUserId")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await authenticationTokenRepository.RemoveByUserIdAsync(userId);
                });

            Field<AuthResponseType, AuthResponse>()
                .Name("AuthLogin")
                .Argument<NonNullGraphType<StringGraphType>, string>("Email", "User email")
                .Argument<NonNullGraphType<StringGraphType>, string>("Password", "User password")
                .ResolveAsync(async context =>
                {
                    string email = context.GetArgument<string>("Email");
                    string password = context.GetArgument<string>("Password");
                    try
					{
                        var authenticationServiceResponse = await authenticationService.Login(email, password);
                        var authenticationServiceApiResponse = new AuthResponse()
                        {
                            AccessToken = authenticationServiceResponse.AccessToken,
                            RefreshToken = authenticationServiceResponse.RefreshToken
                        };
                        return authenticationServiceApiResponse;
                    }
                    catch (Exception exception)
					{
                        context.Errors.Add(new ExecutionError(exception.Message));
                        return new AuthResponse();
					}
                });

            Field<AuthResponseType, AuthResponse>()
                .Name("AuthLogout")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    var authenticationServiceResponse = await authenticationService.Logout(userId);
                    var authenticationServiceApiResponse = new AuthResponse()
                    {
                        AccessToken = authenticationServiceResponse.AccessToken,
                        RefreshToken = authenticationServiceResponse.RefreshToken
                    };
                    return authenticationServiceApiResponse;
                });

            Field<AuthResponseType, AuthResponse>()
                .Name("AuthRefresh")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .Argument<NonNullGraphType<StringGraphType>, string>("RefreshToken", "Refresh token")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    var refreshToken = context.GetArgument<string>("RefreshToken");
                    var authenticationServiceResponse = await authenticationService.Refresh(userId, refreshToken);
                    var authenticationServiceApiResponse = new AuthResponse()
                    {
                        AccessToken = authenticationServiceResponse.AccessToken,
                        RefreshToken = authenticationServiceResponse.RefreshToken
                    };
                    return authenticationServiceApiResponse;
                });

            Field<CalendarType, Calendar>()
                .Name("addEvent")
                .Argument<CalendarInputType, Calendar>("event", "add event to calendar")
                .ResolveAsync(async context =>
                {
                    return await calendarRepository.AddEvent(context.GetArgument<Calendar>("event"));
                });


            Field<CalendarType, Calendar>()
                .Name("deleteEvent")
                .Argument<NonNullGraphType<IdGraphType>, int>("id", "id to delete")
                .ResolveAsync(async context =>
                {
                    return await calendarRepository.RemoveEvent(context.GetArgument<int>("id"));
                });
            
            Field<CalendarType, Calendar>()
                .Name("updateEvent")
                .Argument<CalendarUpdateType, Calendar>("event", "id to delete")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<Calendar>("event");
                    return await calendarRepository.UpdateEvent(model);
                });
        }
    }
}
