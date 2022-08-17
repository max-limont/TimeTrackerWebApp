using Dapper;
using System.Data.SqlClient;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.MsSql.Repositories
{
    public class CalendarRepository : ICalendarRepository
    {
        private readonly string connectionString;

        public CalendarRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task<CalendarDay> CreateDayAsync(CalendarDay model)
        {
            string query = @"INSERT INTO Calendar (Title, DayTypeId, Date, EndDate) VALUES (@Title, @DayTypeId, @Date, @EndDate) SELECT @@IDENTITY";
            using (var connection = new SqlConnection(connectionString))
            {
                int id = await connection.QueryFirstAsync<int>(query, model);
                if (id != 0)
                {
                    try
					{
                        return await GetDayByIdAsync(id);
					}
                    catch (Exception exception)
					{
                        throw new Exception(exception.Message);
					}
                }
                throw new Exception("Calendar day creation error!");
            }
        }
        public async Task<CalendarDay> GetDayByIdAsync(int id)
        {
            string query = @"SELECT * FROM Calendar WHERE Id = @Id";
            using (var connection = new SqlConnection(connectionString))
            {
                var model = await connection.QuerySingleOrDefaultAsync<CalendarDay>(query, new { Id = id });
                if (model is not null)
                {
                    return model;
                }
                throw new Exception("Calendar day with this id was not found!");
            }
        }

        public async Task<IEnumerable<CalendarDay>> FetchAllDaysAsync()
        {
            string query = @"SELECT * FROM Calendar";
            using (var connection = new SqlConnection(connectionString))
            {
                return await connection.QueryAsync<CalendarDay>(query);
            }
        }

        public async Task<IEnumerable<CalendarDay>> FetchDaysRangeAsync(DateTime startDate, DateTime finishDate)
        {
            string query = @"SELECT * FROM Calendar WHERE Date BETWEEN @StartDate AND @FinishDate OR EndDate BETWEEN @StartDate AND @FinishDate";
            using (var connection = new SqlConnection(connectionString))
            {
                return await connection.QueryAsync<CalendarDay>(query, new { 
                    StartDate = startDate, 
                    FinishDate = finishDate
                });
            }
        }

        public async Task<CalendarDay> RemoveDayAsync(int id)
        {
            string query = @"DELETE FROM Calendar WHERE Id = @Id";
            using (var connection = new SqlConnection(connectionString))
            {

                var day = await GetDayByIdAsync(id);
                int affectedRows = await connection.ExecuteAsync(query, new { Id = id });
                if (affectedRows > 0)
                {
                    return day;
                }
                throw new Exception("Calendar day removal error!");
            }

        }

        public async Task<CalendarDay> EditDayAsync(CalendarDay day)
        {
            string query = @"UPDATE Calendar SET Title = @Title, Date = @Date, DayTypeId = @DayTypeId, EndDate = @EndDate WHERE Id = @Id";
            using (var connection = new SqlConnection(connectionString))
            {
                int affectedRows = await connection.ExecuteAsync(query, day);
                if (affectedRows > 0)
                {
                    return day;
                }
            }
            throw new Exception("Calendar day editing error!");
        }
    }
}
