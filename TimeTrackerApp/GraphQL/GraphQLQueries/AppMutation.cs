using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Services;
using System;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppMutation : ObjectGraphType
    {
        public AppMutation(ICalendarRepository calendarRepository, IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRepository vacationRepository, IVacationLevelRepository vacationLevelRepository)
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
            
            Field<VacationType, Vacation>()
                .Name("CreateVacationRequest")
                .Argument<NonNullGraphType<VacationInputType>, Vacation>("VacationRequest", "Vacation request")
                .ResolveAsync(async context =>
                {
                    var vacationRequest = context.GetArgument<Vacation>("VacationRequest");
                    return await vacationRepository.CreateAsync(vacationRequest);
                });
            
            Field<VacationType, Vacation>()
                .Name("EditVacationRequest")
                .Argument<NonNullGraphType<VacationInputType>, Vacation>("VacationRequest", "Vacation request")
                .ResolveAsync(async context =>
                {
                    var vacationRequest = context.GetArgument<Vacation>("VacationRequest");
                    return await vacationRepository.EditAsync(vacationRequest);
                });
            
            Field<VacationType, Vacation>()
                .Name("DeleteVacationRequest")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Vacation request")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await vacationRepository.RemoveAsync(id);
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
                .Argument<NonNullGraphType<StringGraphType>, string>("AccessToken", "Access token")
                .Argument<NonNullGraphType<StringGraphType>, string>("RefreshToken", "Refresh token")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    var accessToken = context.GetArgument<string>("AccessToken");
                    var refreshToken = context.GetArgument<string>("RefreshToken");
                    try
                    {
                        var authenticationServiceResponse = await authenticationService.Refresh(userId, accessToken, refreshToken);
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

            Field<CalendarDayType, CalendarDay>()
                .Name("CreateCalendarDay")
                .Argument<CalendarDayInputType, CalendarDay>("Day", "Calendar day")
                .ResolveAsync(async context =>
                {
                    var day = context.GetArgument<CalendarDay>("Day");
                    return await calendarRepository.CreateDayAsync(day);
                });

            Field<CalendarDayType, CalendarDay>()
                .Name("RemoveCalendarDay")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Calendar day id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<int>("Id");
                    return await calendarRepository.RemoveDayAsync(id);
                });
            
            Field<CalendarDayType, CalendarDay>()
                .Name("EditCalendarDay")
                .Argument<CalendarDayUpdateType, CalendarDay>("Day", "CalendarDay")
                .ResolveAsync(async context =>
                {
                    var day = context.GetArgument<CalendarDay>("Day");
                    return await calendarRepository.EditDayAsync(day);
                });
            
            Field<VacationType,Vacation>()
                .Name("CreateVacation")
                .Argument<VacationInputType, Vacation>("Vacation", "vacation arguments")
                .ResolveAsync(async _ =>
                {
                    var model = _.GetArgument<Vacation>("Vacation");
                    return await vacationRepository.CreateAsync(model);
                });

            Field<VacationType, Vacation>()
                .Name("ChangeAcceptedState")
                .Argument<IntGraphType, int>("Id", "id user")
                .Argument<BooleanGraphType, bool>("StateAccepted", "new state Accepted")
                .ResolveAsync(async _ =>
                {
                    var id = _.GetArgument<int>("Id");
                    var state = _.GetArgument<bool>("StateAccepted");
                    return await vacationRepository.ChangeAcceptedState(id, state);
                });

            Field<VacationLevelType, VacationLevel>()
                .Name("CreateVacationLevel")
                .Argument<VacationLevelInputType, VacationLevel>("VacationLevel", "Vacation level argumment")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<VacationLevel>("VacationLevel");
                    return await vacationLevelRepository.CreateVacationLevel(model);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<VacationLevelType, VacationLevel>()
                .Name("UpdateVacationLevel")
                .Argument<VacationLevelInputType, Vacation>("VacationLevel", "Vacation level argumment")
                .ResolveAsync(async context =>
                {
                    var model = context.GetArgument<VacationLevel>("VacationLevel");
                    return await vacationLevelRepository.UpdateVacationLevel(model);
                })
                .AuthorizeWithPolicy("LoggedIn");


            Field<VacationLevelType, VacationLevel>()
                .Name("DeleleVacationLevel")
                .Argument<IntGraphType, int>("Id", "Id for delete")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<int>("Id");
                    return await vacationLevelRepository.RemoveVacationLevel(id);
                })
                .AuthorizeWithPolicy("LoggedIn");
        }
    }
}
