using TimeTrackerApp.Business.Enums;

namespace TimeTrackerApp.Business.Models
{
	public class SickLeave
	{
		public int Id { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public int EmployeeId { get; set; }
		public int? ApproverId { get; set; }
		public SickLeaveStatuses Status { get; set; } = SickLeaveStatuses.UnderReview;
		public DateTime CreationDateTime { get; set; } = DateTime.UtcNow;

		public User? Approver { get; set; } = null;
	}
}
