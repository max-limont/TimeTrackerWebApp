﻿namespace TimeTrackerApp.Business.Models
{
	public class User
	{
		private readonly static int defaultWeeklyWorkingTime = 8 * 60 * 5; // 8 hours * 60 minutes * 5 days
		private readonly static int defaultRemainingVacationDays = 30; // 30 days
			
		public int Id { get; set; }
		public string Email { get; set; } = string.Empty;
		public string Password { get; set; } = string.Empty;
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public int WeeklyWorkingTime { get; set; } = defaultWeeklyWorkingTime;
		public int RemainingVacationDays { get; set; } = defaultRemainingVacationDays;
		public int PrivilegesValue { get; set; }
	}
}