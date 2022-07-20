namespace TimeTrackerApp.Business.Enums
{
	[Flags]
	public enum Privileges
	{
		WatchUsers = 0,
		CreateUsers = 1,
		EditUsers = 2,
		DeleteUsers = 4,
		ManageVacations = 8,
	}
}
