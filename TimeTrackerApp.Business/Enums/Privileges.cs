namespace TimeTrackerApp.Business.Enums
{
	[Flags]
	public enum Privileges:Int32
	{
		WatchUsers = 1,
		CreateUsers = 2,
		EditUsers = 4,
		ManageCalendarNotes = 8,
		ManageSickLeaves = 16,
		ApproveAndRejectVacations = 32
	}
}
