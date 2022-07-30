using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Services;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppMutation : ObjectGraphType
    {
        public AppMutation(IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRequestRepository vacationRequestRepository)
        {
            var authenticationService = new AuthenticationService(userRepository, authenticationTokenRepository);

            Field<AuthTokenType>(
                "authToken_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<AuthTokenInputType>> { Name = "authToken" }),
                resolve: context =>
                {
                    AuthenticationToken token = context.GetArgument<AuthenticationToken>("authToken");
                    authenticationTokenRepository.CreateAsync(token);
                    return token;
                }
            );
            Field<StringGraphType>(
                "authToken_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("id");
                    if (authenticationTokenRepository.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    authenticationTokenRepository.RemoveAsync(id);
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
                    authenticationTokenRepository.EditAsync(token);
                    return token;
                }
            );


            Field<RecordType>(
                "record_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<RecordInputType>> { Name = "record" }),
                resolve: context =>
                {
                    Record record = context.GetArgument<Record>("record");
                    recordRepository.CreateAsync(record);
                    return record;
                }
            );

            Field<StringGraphType>(
                "record_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("id");
                    if (recordRepository.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    authenticationTokenRepository.RemoveAsync(id);
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
                    recordRepository.EditAsync(record);
                    return record;
                }
            );


            Field<UserType>(
                "user_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<UserInputType>> { Name = "user" }),
                resolve: context =>
                {
                    User user = context.GetArgument<User>("user");
                    userRepository.CreateAsync(user);
                    return user;
                }
            );
            Field<StringGraphType>(
                "user_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("id");
                    if (userRepository.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    userRepository.RemoveAsync(id);
                    return $"The User with the id: {id} has been successfully deleted from db.";
                }
            );
            Field<UserType>(
                "user_edit",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<UserInputType>> { Name = "user" }
                ),
                resolve: context =>
                {
                    User user = context.GetArgument<User>("user");
                    userRepository.EditAsync(user);
                    return user;
                }
            );
            Field<UserType>(
                "user_changePassword",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" },
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "password" }
                ),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("id");
                    string password = context.GetArgument<string>("password");
                    return userRepository.ChangePassword(id, password);
                }
            );


            Field<VacationRequestType>(
                "vacationRequest_create",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<VacationRequestInputType>> { Name = "vacationRequest" }),
                resolve: context =>
                {
                    VacationRequest vacationRequest = context.GetArgument<VacationRequest>("vacationRequest");
                    vacationRequestRepository.CreateAsync(vacationRequest);
                    return vacationRequest;
                }
            );

            Field<StringGraphType>(
                "vacationRequest_delete",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    int id = context.GetArgument<int>("id");
                    if (vacationRequestRepository.GetByIdAsync(id) == null)
                    {
                        context.Errors.Add(new ExecutionError("Couldn't find in db."));
                        return null;

                    }
                    vacationRequestRepository.RemoveAsync(id);
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
                    vacationRequestRepository.EditAsync(vacationRequest);
                    return vacationRequest;
                }
            );

            Field<AuthResponseType, AuthResponse>()
                .Name("auth_login")
                .Argument<NonNullGraphType<UserLoginType>, string>("user", "User login")
                .ResolveAsync(async context =>
                {
                    UserLogin userLogin = context.GetArgument<UserLogin>("user");
                    var authenticationServiceResponse = await authenticationService.Login(userLogin.Email, userLogin.Password);
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
        }
    }
}
