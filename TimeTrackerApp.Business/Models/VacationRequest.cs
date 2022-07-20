namespace TimeTrackerApp.Business.Models
{
	public class VacationRequest
	{
		public int Id { get; set; }
		public DateTime StartingTime { get; set; }
		public DateTime EndingTime { get; set; }
		public string? Comment { get; set; } = string.Empty;
	}
}
