
namespace TimeTrackerApp.Business.Models
{
    public  class Calendar
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public int? TypeDayId { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
