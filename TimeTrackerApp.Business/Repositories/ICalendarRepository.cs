using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
    public interface ICalendarRepository
    {
        public Task<List<Calendar>> GetEventRange(DateTime startDate, DateTime finishDate);
        public Task<List<Calendar>> GetAllEvents();
        public  Task<Calendar> AddEvent(Calendar model);
        public Task<Calendar> RemoveEvent(int id);
        public Task<Calendar> UpdateEvent(Calendar model);
        public Task<Calendar> GetEventById(int id);
    }
}
