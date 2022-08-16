using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Repositories
{
    public interface ICalendarRepository
    {
        public Task<IEnumerable<CalendarDay>> FetchAllDaysAsync();
        public Task<IEnumerable<CalendarDay>> FetchDaysRangeAsync(DateTime startDate, DateTime finishDate);
        public Task<CalendarDay> GetDayByIdAsync(int id);
        public Task<CalendarDay> CreateDayAsync(CalendarDay day);
        public Task<CalendarDay> EditDayAsync(CalendarDay day);
        public Task<CalendarDay> RemoveDayAsync(int id);
    }
}
