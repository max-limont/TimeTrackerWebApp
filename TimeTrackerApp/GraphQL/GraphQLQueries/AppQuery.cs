using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using System.Collections.Generic;
using System;
using TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(ICalendarRepository calendarRepository,IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRequestRepository vacationRequestRepository)
        {
            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Name("FetchAllUsers")
               .ResolveAsync(async context =>
               {
                   return await userRepository.FetchAllAsync();
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<UserType, User>()
                .Name("GetUserById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await userRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<UserType, User>()
                .Name("GetUserByEmail")
                .Argument<NonNullGraphType<StringGraphType>, string>("Email", "User email")
                .ResolveAsync(async context =>
                {
                    string email = context.GetArgument<string>("Email");
                    return await userRepository.GetByEmailAsync(email);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<RecordType>, IEnumerable<Record>>()
                .Name("FetchAllRecords")
                .ResolveAsync(async context =>
                {
                    return await recordRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<RecordType, Record>()
                .Name("GetRecordById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Record id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await recordRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<RecordType>, IEnumerable<Record>>()
                .Name("FetchAllUserRecords")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await recordRepository.FetchAllUserRecordsAsync(userId);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<VacationRequestType>, IEnumerable<VacationRequest>>()
                .Name("FetchAllVacationRequests")
                .ResolveAsync(async context =>
                {
                    return await vacationRequestRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<VacationRequestType, VacationRequest>()
                .Name("GetVacationRequestById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Vacation request id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await vacationRequestRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<VacationRequestType>, IEnumerable<VacationRequest>>()
                .Name("FetchAllUserVacationRequests")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await vacationRequestRepository.FetchAllUserVacationRequestsAsync(userId);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<AuthTokenType>, IEnumerable<AuthenticationToken>>()
                .Name("FetchAllAuthenticationTokens")
                .ResolveAsync(async context =>
                {
                    return await authenticationTokenRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<AuthTokenType, AuthenticationToken>()
                .Name("GetAuthenticationTokenById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Authentication token id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await authenticationTokenRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<AuthTokenType, AuthenticationToken>()
                .Name("GetAuthenticationTokenByUserId")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await authenticationTokenRepository.GetByUserIdAsync(userId);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<CalendarType>, List<Calendar>>()
                .Name("getEvents")
                .ResolveAsync(async context => await calendarRepository.GetAllEvents());


            Field<ListGraphType<CalendarType>, IEnumerable<Calendar>>()
                .Name("getRangeEvents")
                .Argument<DateGraphType>("startDate", "start date")
                .Argument<DateGraphType>("finishDate", "finish date")
                .ResolveAsync(async context =>
                {
                    DateTime startDate = context.GetArgument<DateTime>("startDate"),
                    finishDate = context.GetArgument<DateTime>("finishDate");
                    return await calendarRepository.GetEventRange(startDate, finishDate);
                });


            Field<CalendarType, Calendar>()
                .Name("getEventById")
                .Argument<NonNullGraphType<IdGraphType>>("eventId", "event id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<int>("eventId");
                    return await calendarRepository.GetEventById(id);
                });

        }
    }
}