namespace TimeTrackerApp.Business.Models
{
	public class BackgroundTask
	{
		public int Id { get; set; }
		public string Type { get; set; } = string.Empty;
		public DateTime DateTime { get; set; }
	}
}
