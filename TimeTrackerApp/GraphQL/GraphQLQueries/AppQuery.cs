using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using TimeTrackerApp.Business.Enums;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(IHttpContextAccessor contextAccessor,ICalendarRepository calendarRepository, IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRepository vacationRepository, ISickLeaveRepository sickLeaveRepository)
        {
            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Name("FetchAllUsers")
               .ResolveAsync(async context =>
               {
                   var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims.First(x=>x.Type=="UserPrivilegesValue").Value);
                   var result =userPermission & Convert.ToInt32(Privileges.WatchUsers);
                   if (!(result>0))
                   {
                       throw new Exception("You dont have permission to edit users");
                   }
                   return await userRepository.FetchAllAsync();
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Argument<NonNullGraphType<IntGraphType>, int>("From", "From row")
               .Argument<NonNullGraphType<IntGraphType>, int>("ContentPerPage", "Content per page")
               .Argument<StringGraphType, string>("OrderBy", "Order by")
               .Argument<BooleanGraphType, bool?>("IsReverse", "Is reverse")
               .Name("UserFetchPageList")
               .ResolveAsync(async context =>
               {
                   var userPermission = int.Parse(contextAccessor.HttpContext.User.Identities.First().Claims.First(x=>x.Type=="UserPrivilegesValue").Value);
                   var result =userPermission & Convert.ToInt32(Privileges.WatchUsers);
                   if (!(result>0))
                   {
                       throw new Exception("You dont have permission to edit users");
                   }
                   int from = context.GetArgument<int>("From");
                   int contentPerPage = context.GetArgument<int>("ContentPerPage");
                   string orderBy = context.GetArgument<string>("OrderBy");
                   bool? isReverse = context.GetArgument<bool?>("IsReverse");
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
               .Name("UserFetchSearchList")
               .ResolveAsync(async context =>
               {
                   string request = context.GetArgument<string>("Request");
                   return await userRepository.FetchSearchListAsync(request);
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<IntGraphType, int>()
               .Name("UserCount")
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

            Field<ListGraphType<RecordType>, IEnumerable<Record>>()
                .Name("FetchUserRecordsByMonth")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .Argument<NonNullGraphType<IntGraphType>, int>("MonthNumber", "The number of month")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    var monthNumber = context.GetArgument<int>("MonthNumber");
                    return await recordRepository.FetchUserRecordsByMonthAsync(userId, monthNumber);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<RecordType>, IEnumerable<Record>>()
                .Name("FetchUserRecordsByDate")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .Argument<NonNullGraphType<DateTimeGraphType>, DateTime>("Date", "Date of work")
                .ResolveAsync(async context =>
                {
                    var userId = context.GetArgument<int>("UserId");
                    var date = context.GetArgument<DateTime>("Date");
                    return await recordRepository.FetchUserRecordsByDateAsync(userId, date);
                })
                .AuthorizeWithPolicy("LoggedIn");


            Field<ListGraphType<TimeTrackerDailyStatisticsType>, IEnumerable<TimeTrackerDailyStatistics>>()
                .Name("FetchUserLastWeekTimeTrackerStatistics")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    var result = new List<TimeTrackerDailyStatistics>();
                    var userId = context.GetArgument<int>("UserId");
                    var dayOfWeek = DateTime.UtcNow.DayOfWeek == 0 ? 6 : (int)DateTime.UtcNow.DayOfWeek - 1;
                    for (DateTime date = DateTime.UtcNow.AddDays(-dayOfWeek); date <= DateTime.UtcNow.AddDays(6 - dayOfWeek); date = date.AddDays(1))
					{
                        var records = await recordRepository.FetchUserRecordsByDateAsync(userId, date);
                        var totalWorkingTime = 0;
                        foreach (var record in records)
						{
                            totalWorkingTime += record.WorkingTime;
						}
                        var timeTrackerDailyStatistics = new TimeTrackerDailyStatistics()
                        {
                            Date = date,
                            TotalWorkingTime = totalWorkingTime
                        };
                        result.Add(timeTrackerDailyStatistics);
					}
                    return result;
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<VacationType>, IEnumerable<Vacation>>()
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
                    return await vacationRepository.GetVacationByIdAsync(id);
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

            Field<ListGraphType<SickLeaveType>, IEnumerable<SickLeave>>()
                .Name("FetchAllSickLeaves")
                .ResolveAsync(async context =>
                {
                    return await sickLeaveRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn"); ;

            Field<ListGraphType<SickLeaveType>, IEnumerable<SickLeave>>()
                .Name("FetchAllSickLeavesByEmployeeId")
                .Argument<NonNullGraphType<IdGraphType>, int>("EmployeeId", "Employee id")
                .ResolveAsync(async context =>
                {
                    var employeeId = context.GetArgument<int>("EmployeeId");
                    return await sickLeaveRepository.FetchAllByEmployeeIdAsync(employeeId);
                })
                .AuthorizeWithPolicy("LoggedIn"); ;

            Field<ListGraphType<SickLeaveType>, IEnumerable<SickLeave>>()
                .Name("FetchAllSickLeavesForManagerByManagerId")
                .Argument<NonNullGraphType<IdGraphType>, int>("ManagerId", "Manager id")
                .ResolveAsync(async context =>
                {
                    var managerId = context.GetArgument<int>("ManagerId");
                    return await sickLeaveRepository.FetchAllForManagerByManagerIdAsync(managerId);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<SickLeaveType, SickLeave>()
                .Name("GetSickLeaveById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Sick leave id")
                .ResolveAsync(async context =>
                {
                    var id = context.GetArgument<int>("Id");
                    return await sickLeaveRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn"); 
            
            Field<ListGraphType<UserType>, List<User>>()
                .Name("GetApprovers")
                .Argument<IntGraphType, int>("userId", "user id")
                .ResolveAsync(async context =>
                {
                    return await vacationRepository.GetVacationApprovers(context.GetArgument<int>("userId"));
                })
                .AuthorizeWithPolicy("LoggedIn");
        }
    }
}