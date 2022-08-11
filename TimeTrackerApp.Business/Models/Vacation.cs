namespace TimeTrackerApp.Business.Models
{
	public class Vacation
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public DateTime StartingTime { get; set; }
		public DateTime EndingTime { get; set; }
		public string? Comment { get; set; } = string.Empty;
		public bool? IsAccepted { get; set; }
	}
}
