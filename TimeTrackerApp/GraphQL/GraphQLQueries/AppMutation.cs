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
                .Name("user_create")
                .Argument<NonNullGraphType<UserInputType>, User>("User", "User")
                .ResolveAsync(async context =>
                {
                    var user = context.GetArgument<User>("User");
                    return await userRepository.CreateAsync(user);
                });

            Field<UserType, User>()
                .Name("user_delete")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await userRepository.RemoveAsync(id);
                });

            Field<UserType, User>()
                .Name("user_edit")
                .Argument<NonNullGraphType<UserInputType>, User>("User", "User")
                .ResolveAsync(async context =>
                {
                    var user = context.GetArgument<User>("User");
                    return await userRepository.EditAsync(user);
                });

            Field<UserType, User>()
                .Name("user_changePassword")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .Argument<NonNullGraphType<StringGraphType>, string>("Password", "New user password")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    string password = context.GetArgument<string>("Password");
                    return await userRepository.ChangePassword(id, password);
                });

            Field<RecordType, Record>()
                .Name("record_create")
                .Argument<NonNullGraphType<RecordInputType>, Record>("Record", "Record")
                .ResolveAsync(async context =>
                {
                    var record = context.GetArgument<Record>("Record");
                    return await recordRepository.CreateAsync(record);
                });

            Field<RecordType, Record>()
                .Name("record_edit")
                .Argument<NonNullGraphType<RecordInputType>, Record>("Record", "Record")
                .ResolveAsync(async context =>
                {
                    var record = context.GetArgument<Record>("Record");
                    return await recordRepository.EditAsync(record);
                });

            Field<RecordType, Record>()
                .Name("record_delete")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Record id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await recordRepository.RemoveAsync(id);
                });

            Field<VacationRequestType, VacationRequest>()
                .Name("vacationRequest_create")
                .Argument<NonNullGraphType<VacationRequestInputType>, VacationRequest>("VacationRequest", "Vacation request")
                .ResolveAsync(async context =>
                {
                    var vacationRequest = context.GetArgument<VacationRequest>("VacationRequest");
                    return await vacationRequestRepository.CreateAsync(vacationRequest);
                });

            Field<VacationRequestType, VacationRequest>()
                .Name("vacationRequest_edit")
                .Argument<NonNullGraphType<VacationRequestInputType>, VacationRequest>("VacationRequest", "Vacation request")
                .ResolveAsync(async context =>
                {
                    var vacationRequest = context.GetArgument<VacationRequest>("VacationRequest");
                    return await vacationRequestRepository.EditAsync(vacationRequest);
                });
            
            Field<VacationRequestType, VacationRequest>()
                .Name("vacationRequest_delete")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Vacation request")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await vacationRequestRepository.RemoveAsync(id);
                });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("authToken_create")
                .Argument<NonNullGraphType<AuthTokenInputType>, AuthenticationToken>("AuthToken", "Authentication token")
                .ResolveAsync(async context =>
                {
                    var authenticationToken = context.GetArgument<AuthenticationToken>("AuthToken");
                    return await authenticationTokenRepository.CreateAsync(authenticationToken);
                });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("authToken_edit")
                .Argument<NonNullGraphType<AuthTokenInputType>, AuthenticationToken>("AuthToken", "Authentication token")
                .ResolveAsync(async context =>
                {
                    var authenticationToken = context.GetArgument<AuthenticationToken>("AuthToken");
                    return await authenticationTokenRepository.EditAsync(authenticationToken);
                });

            Field<AuthTokenType, AuthenticationToken>()
               .Name("authToken_delete")
               .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Authentication token id")
               .ResolveAsync(async context =>
               {
                   int id = context.GetArgument<int>("Id");
                   return await authenticationTokenRepository.RemoveAsync(id);
               });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("authToken_deleteByUserId")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await authenticationTokenRepository.RemoveByUserIdAsync(userId);
                });

            Field<AuthResponseType, AuthResponse>()
                .Name("auth_login")
                .Argument<NonNullGraphType<StringGraphType>, string>("Email", "User email")
                .Argument<NonNullGraphType<StringGraphType>, string>("Password", "User password")
                .ResolveAsync(async context =>
                {
                    string email = context.GetArgument<string>("Email");
                    string password = context.GetArgument<string>("Password");
                    var authenticationServiceResponse = await authenticationService.Login(email, password);
                    var authenticationServiceApiResponse = new AuthResponse()
                    {
                        AccessToken = authenticationServiceResponse.AccessToken,
                        RefreshToken = authenticationServiceResponse.RefreshToken,
                        Message = authenticationServiceResponse.Message,
                    };
                    return authenticationServiceApiResponse;
                });

            Field<AuthResponseType, AuthResponse>()
                .Name("auth_logout")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    var authenticationServiceResponse = await authenticationService.Logout(userId);
                    var authenticationServiceApiResponse = new AuthResponse()
                    {
                        AccessToken = authenticationServiceResponse.AccessToken,
                        RefreshToken = authenticationServiceResponse.RefreshToken,
                        Message = authenticationServiceResponse.Message,
                    };
                    return authenticationServiceApiResponse;
                });

            Field<AuthResponseType, AuthResponse>()
                .Name("auth_refresh")
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
                        RefreshToken = authenticationServiceResponse.RefreshToken,
                        Message = authenticationServiceResponse.Message,
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
                    return await calendarRepository.UpdateEvent(context.GetArgument<Calendar>("event"));
                });
        }
    }
}
