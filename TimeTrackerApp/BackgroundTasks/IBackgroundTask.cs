using Quartz;
using System;
using System.Threading.Tasks;

namespace TimeTrackerApp.BackgroundTasks
{
	public interface IBackgroundTask : IJob
	{
		string TaskType { get; }
		Task Execute(IJobExecutionContext context, DateTime dateTime);
	}
}
