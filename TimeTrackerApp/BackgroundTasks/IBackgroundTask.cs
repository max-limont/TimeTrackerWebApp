using Quartz;

namespace TimeTrackerApp.BackgroundTasks
{
	public interface IBackgroundTask : IJob
	{
		string TaskType { get; }
	}
}
