namespace TimeTrackerApp.Business.Models
{
	public class Record
	{
		private static readonly int defaultWorkingTime = 8 * 60; // 8 hours * 60 minutes

		public int Id { get; set; }
		public int WorkingTime { get; set; } = defaultWorkingTime;
		public string? Comment { get; set; } = string.Empty;
		public int EmployeeId { get; set; }
		public int? EditorId { get; set; } = null;
		public bool IsAutomaticallyCreated { get; set; }
		public DateTime CreatedAt { get; set; } = DateTime.Now;
	}
}
