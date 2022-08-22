using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using System.Collections.Generic;
using System;
using GraphQL.MicrosoftDI;
using Microsoft.AspNetCore.Http;
using TimeTrackerApp.GraphQL.GraphQLQueries.RoleQueries;
using TimeTrackerApp.GraphQL.GraphQLQueries.TeamQueries;
using TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes;
using TimeTrackerApp.Helpers;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(ICalendarRepository calendarRepository, IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRepository vacationRepository)
        {
            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Name("FetchAllUsers")
               .ResolveAsync(async context =>
               {
                   return await userRepository.FetchAllAsync();
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Argument<NonNullGraphType<IntGraphType>, int>("from", "From row")
               .Argument<NonNullGraphType<IntGraphType>, int>("contentPerPage", "Content per page")
               .Argument<StringGraphType?, string?>("orderBy", "Order by")
               .Argument<BooleanGraphType?, bool?>("isReverse", "Is reverse")
               .Name("userFetchPageList")
               .ResolveAsync(async context =>
               {
                   int from = context.GetArgument<int>("from");
                   int contentPerPage = context.GetArgument<int>("contentPerPage");
                   string? orderBy = context.GetArgument<string?>("orderBy");
                   bool? isReverse = context.GetArgument<bool?>("isReverse");
                   if (orderBy != null)
                   {
                       if (isReverse != null)
                           return await userRepository.FetchPageListAsync(from, contentPerPage, orderBy, (bool)isReverse);
                       return await userRepository.FetchPageListAsync(from, contentPerPage, orderBy);
                   }
                   return await userRepository.FetchPageListAsync(from, contentPerPage);
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Argument<StringGraphType, string>("request", "Request")
               .Name("userFetchSearchList")
               .ResolveAsync(async context =>
               {
                   string request = context.GetArgument<string>("request");
                   return await userRepository.FetchSearchListAsync(request);
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<IntGraphType, int>()
               .Name("userCount")
               .ResolveAsync(async context =>
               {
                   return await userRepository.GetCountAsync();
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
            
            Field<ListGraphType<VacationType>, List<Vacation>>()
                .Name("FetchAllVacationRequests")
                .ResolveAsync(async context =>
                {
                    return await vacationRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");
            
            Field<VacationType, Vacation>()
                .Name("GetVacationRequestById")
                .Argument<NonNullGraphType<IdGraphType>>("Id", "Vacation request id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await vacationRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");
            
            Field<ListGraphType<VacationType>, IEnumerable<Vacation>>()
                .Name("FetchAllUserVacationRequests")
                .Argument<NonNullGraphType<IdGraphType>>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await vacationRepository.FetchAllUserVacationAsync(userId);
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

            Field<ListGraphType<CalendarDayType>, IEnumerable<CalendarDay>>()
                .Name("FetchAllCalendarDays")
                .ResolveAsync(async context => {
                    return await calendarRepository.FetchAllDaysAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<CalendarDayType>, IEnumerable<CalendarDay>>()
                .Name("FetchCalendarDaysRange")
                .Argument<DateGraphType>("StartDate", "Start date")
                .Argument<DateGraphType>("FinishDate", "Finish date")
                .ResolveAsync(async context =>
                {
                    var startDate = context.GetArgument<DateTime>("StartDate");
                    var finishDate = context.GetArgument<DateTime>("FinishDate");
                    return await calendarRepository.FetchDaysRangeAsync(startDate, finishDate);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<CalendarDayType, CalendarDay>()
                .Name("GetCalendarDayById")
                .Argument<NonNullGraphType<IdGraphType>>("Id", "Day id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<int>("Id");
                    return await calendarRepository.GetDayByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<VacationType>, List<Vacation>>()
                .Name("GetRequestVaction")
                .Argument<IntGraphType, int>("ReceiverId", "")
                .ResolveAsync(async contex =>
                {
                    var id = contex.GetArgument<int>("ReceiverId");
                    return await vacationRepository.GetRequestVacation(id);
                })
                .AuthorizeWithPolicy("LoggedIn"); 
            
            Field<RoleQuery>()
                .Name("RoleQuery")
                .Resolve(_ => new { });

            Field<TeamQuery>()
                .Name("TeamQuery")
                .Resolve(_ => new { });

        }
    }
}