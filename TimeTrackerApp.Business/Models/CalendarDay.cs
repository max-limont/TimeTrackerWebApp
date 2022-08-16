
namespace TimeTrackerApp.Business.Models
{
    public class CalendarDay
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int? DayTypeId { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
