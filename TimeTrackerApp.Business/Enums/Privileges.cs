namespace TimeTrackerApp.Business.Enums
{
	[Flags]
	public enum Privileges:Int32
	{
		WatchUsers = 1,
		CreateUsers = 2,
		EditUsers = 4,
		DeleteUsers = 8
	}
}
