using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Services;
using System;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using TimeTrackerApp.Business.Enums;
using TimeTrackerApp.Services;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppMutation : ObjectGraphType
    {
        public AppMutation(IHttpContextAccessor contextAccessor, ICalendarRepository calendarRepository,
            IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository,
            IUserRepository userRepository, IVacationRepository vacationRepository,
            ISickLeaveRepository sickLeaveRepository, IVacationResponseRepository vacationResponseRepository)
        {
            var authenticationService = new AuthenticationService(userRepository, authenticationTokenRepository);

            Field<UserType, User>()
                .Name("ChangedPrivelege")
                .Argument<IntGraphType, int>("userId", "user id whose privelege will be update")
                .Argument<IntGraphType, int>("privilegeValue", "value privilege")
                .ResolveAsync(async context =>
                {
                    var userId = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserId").Value);
                    if (userId == context.GetArgument<int>("userId"))
                    {
                        throw new Exception("You cant change yourself privilege");
                    }

                    var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserPrivilegesValue").Value);
                    var result = userPermission & Convert.ToInt32(Privileges.EditUsers);
                    if (!(result > 0))
                    {
                        throw new Exception("You dont have permission to edit users");
                    }

                    var valuePrivilege = context.GetArgument<int>("privilegeValue");
                    var user = await userRepository.ChangePrivelegeValueAsync(new User
                    {
                        Id = userId,
                        PrivilegesValue = valuePrivilege
                    });
                    return user;
                });

            // Field<UserType, User>()
            //     .Name("RemovePrivilege")
            //     .Argument<IntGraphType, int>("userId", "user id whose privelege will be update")
            //     .Argument<IntGraphType, int>("privilegeValue", "value privilege")
            //     .ResolveAsync(async context =>
            //     {
            //         var userId = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims.First(x=>x.Type=="UserId").Value);
            //         if (userId==context.GetArgument<int>("userId"))
            //         {
            //             throw new Exception("You cant remove yourself privilege");
            //         }
            //         var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims.First(x=>x.Type=="UserPrivilegesValue").Value);
            //         var result =userPermission & Convert.ToInt32(Privileges.EditUsers);
            //         if (!(result>0))
            //         {
            //             throw new Exception("You dont have permission to edit users");
            //         }
            //         var removeValuePrivilege = context.GetArgument<int>("privilegeValue");
            //         var valuePrivilegeUser = (await userRepository.GetByIdAsync(userId)).PrivilegesValue;
            //         return await userRepository.ChangePrivelegeValueAsync(new User
            //         {
            //             Id = userId,
            //             PrivilegesValue = valuePrivilegeUser- removeValuePrivilege
            //         });
            //     });
            //
            // Field<UserType, User>()
            //     .Name("AddPrivilege")
            //     .Argument<IntGraphType, int>("privilegeValue", "value privilege")
            //     .Argument<IntGraphType, int>("userId", "user id whose privelege will be update")
            //     .ResolveAsync(async context =>
            //     {
            //         var userId = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims.First(x=>x.Type=="UserId").Value);
            //         if (userId==context.GetArgument<int>("userId"))
            //         {
            //             throw new Exception("You cant add a privilege for yourself");
            //         }
            //         var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims.First(x=>x.Type=="UserPrivilegesValue").Value);
            //         var result =userPermission & Convert.ToInt32(Privileges.EditUsers);
            //         if (!(result>0))
            //         {
            //             throw new Exception("You dont have permission to edit users");
            //         }
            //         var addValuePrivilege = context.GetArgument<int>("privilegeValue");
            //         var valuePrivilegeUser = (await userRepository.GetByIdAsync(userId)).PrivilegesValue;
            //         return await userRepository.ChangePrivelegeValueAsync(new User
            //         {
            //             Id = userId,
            //             PrivilegesValue = valuePrivilegeUser +  addValuePrivilege
            //         });
            //     });

            Field<UserType, User>()
                .Name("CreateUser")
                .Argument<NonNullGraphType<UserInputType>, User>("User", "User")
                .ResolveAsync(async context =>
                {
                    var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserPrivilegesValue").Value);
                    var result = userPermission & Convert.ToInt32(Privileges.CreateUsers);
                    if (!(result > 0))
                    {
                        throw new Exception("You dont have permission to create users");
                    }

                    var user = context.GetArgument<User>("User");
                    try
                    {
                        await userRepository.GetByEmailAsync(user.Email);
                        return null;
                    }
                    catch (Exception ex)
                    {
                        if (ex.Message == "User with this email was not found!")
                            return await userRepository.CreateAsync(user);
                        return null;
                    }
                });

            Field<UserType, User>()
                .Name("DeleteUser")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .ResolveAsync(async context =>
                {
                    var userId = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserId").Value);
                    if (userId == context.GetArgument<int>("userId"))
                    {
                        throw new Exception("You cant delete yourself");
                    }

                    var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserPrivilegesValue").Value);
                    var result = userPermission & Convert.ToInt32(Privileges.DeleteUsers);
                    if (!(result > 0))
                    {
                        throw new Exception("You dont have permission to delete users");
                    }

                    int id = context.GetArgument<int>("Id");
                    return await userRepository.ChangeActivationState(new User()
                    {
                        Id = id,
                        Activation = false
                    });
                });

            Field<UserType, User>()
                .Name("EditUser")
                .Argument<NonNullGraphType<UserInputType>, User>("User", "User")
                .ResolveAsync(async context =>
                {
                    var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserPrivilegesValue").Value);
                    var result = userPermission & Convert.ToInt32(Privileges.EditUsers);
                    if (!(result > 0))
                    {
                        throw new Exception("You dont have permission to edit users");
                    }

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
                    var userId = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserId").Value);
                    if (record.EmployeeId == userId)
                    {
                        return await recordRepository.EditAsync(record);
                    }

                    var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims
                        .First(x => x.Type == "UserPrivilegesValue").Value);
                    var result = userPermission & Convert.ToInt32(Privileges.EditUsers);
                    if (!(result > 0))
                    {
                        throw new Exception("You dont have permission to edit records for another users");
                    }

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
                .Argument<IntGraphType, int>("Id", "Vacation request")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    var response = await vacationResponseRepository.RemoveVacationResponseByVacationId(id);
                    var model = await vacationRepository.RemoveAsync(id);

                    return model;
                });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("CreateAuthenticationToken")
                .Argument<NonNullGraphType<AuthTokenInputType>, AuthenticationToken>("AuthToken",
                    "Authentication token")
                .ResolveAsync(async context =>
                {
                    var authenticationToken = context.GetArgument<AuthenticationToken>("AuthToken");
                    return await authenticationTokenRepository.CreateAsync(authenticationToken);
                });

            Field<AuthTokenType, AuthenticationToken>()
                .Name("EditAuthenticationToken")
                .Argument<NonNullGraphType<AuthTokenInputType>, AuthenticationToken>("AuthToken",
                    "Authentication token")
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
                        var authenticationServiceResponse =
                            await authenticationService.Refresh(userId, accessToken, refreshToken);
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

            Field<VacationType, Vacation>()
                .Name("CreateVacation")
                .Argument<VacationInputType, Vacation>("Vacation", "vacation arguments")
                .ResolveAsync(async _ =>
                {
                    var model = _.GetArgument<Vacation>("Vacation");
                    return await vacationRepository.CreateAsync(model);
                });

            Field<VacationType, Vacation>()
                .Name("ChangeAcceptedState")
                .Argument<VacationResponseInputType, VacationResponse>("response", "response ")
                .Argument<BooleanGraphType, bool>("StateAccepted", "new state Accepted")
                .ResolveAsync(async _ =>
                {
                    var response = _.GetArgument<VacationResponse>("response");
                    var state = _.GetArgument<bool>("StateAccepted");
                    return await vacationRepository.ChangeAcceptedState(response, state);
                });

            Field<SickLeaveType, SickLeave>()
                .Name("CreateSickLeave")
                .Argument<NonNullGraphType<SickLeaveInputType>, SickLeave>("SickLeave", "Sick leave")
                .ResolveAsync(async context =>
                {
                    var sickLeave = context.GetArgument<SickLeave>("SickLeave");
                    return await sickLeaveRepository.CreateAsync(sickLeave);
                });

            Field<SickLeaveType, SickLeave>()
                .Name("EditSickLeave")
                .Argument<NonNullGraphType<SickLeaveInputType>, SickLeave>("SickLeave", "Sick leave")
                .ResolveAsync(async context =>
                {
                    var sickLeave = context.GetArgument<SickLeave>("SickLeave");
                    return await sickLeaveRepository.EditAsync(sickLeave);
                });

            Field<SickLeaveType, SickLeave>()
                .Name("RemoveSickLeave")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Sick leave id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<int>("Id");
                    return await sickLeaveRepository.RemoveAsync(id);
                });
        }
    }
}