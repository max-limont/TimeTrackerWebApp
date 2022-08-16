using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public async Task<Calendar> AddEvent(Calendar model)
        {
            string query = @"Insert Into Calendar (Title,DayTypeId,Date,EndDate)
           Values (@Title,@TypeDayId, @Date,@EndDate)  SELECT @@IDENTITY";
            using (var connection = new SqlConnection(connectionString))
            {
                int id = await connection.QueryFirstAsync<int>(query, model);

                if (id != 0)
                {
                    return await GetEventById(id);
                }
                throw new NotImplementedException();
            }
        }
        public async Task<Calendar> GetEventById(int id)
        {
            string query = @$"Select * From Calendar where Id={id}";
            using (var connection = new SqlConnection(connectionString))
            {
                var model = await connection.QueryFirstOrDefaultAsync<Calendar>(query);

                if (model != null)
                {
                    return model;
                }
                throw new NotImplementedException();
            }
        }

        public async Task<List<Calendar>> GetAllEvents()
        {
            string query = @"Select * From Calendar";
            using (var connection = new SqlConnection(connectionString))
            {
                return (await connection.QueryAsync<Calendar>(query)).ToList();
            }
        }

        public async Task<List<Calendar>> GetEventRange(DateTime startDate, DateTime finishDate)
        {
            string query = @"Select * From Calendar WHERE Date BETWEEN @startDate AND @finishDate or EndDate Between  @startDate AND @finishDate";
            using (var connection = new SqlConnection(connectionString))
            {
                return (await connection.QueryAsync<Calendar>(query, new { 
                startDate = startDate, 
                finishDate = finishDate
                })).ToList();
            }
        }

        public async Task<Calendar> RemoveEvent(int id)
        {
            string query = @"Delete From Calendar where Id=@id";
            using (var connection = new SqlConnection(connectionString))
            {

                var record = await GetEventById(id);
                int affectedRows = await connection.ExecuteAsync(query, new { id = id });
                if (affectedRows > 0)
                {
                    return record;
                }
                throw new NotImplementedException();
            }

        }

        public async Task<Calendar> UpdateEvent(Calendar model)
        {
            string query = @"Update Calendar set Title=@Title, Date=@Date, DayTypeId=@TypeDayId,EndDate=@EndDate  where Id=@Id";
            using (var connection = new SqlConnection(connectionString))
            {
                int affectedRows = await connection.ExecuteAsync(query, model);
                if (affectedRows > 0)
                {
                    return model;
                }
            }
            throw new NotImplementedException();
        }
    }
}
