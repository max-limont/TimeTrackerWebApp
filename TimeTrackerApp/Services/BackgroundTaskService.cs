using Microsoft.Extensions.Hosting;
using Quartz;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace TimeTrackerApp.Services
{
	public class BackgroundTaskService : IHostedService
	{
		private readonly ISchedulerFactory schedulerFactory;

		public BackgroundTaskService(ISchedulerFactory schedulerFactory)
		{
			this.schedulerFactory = schedulerFactory;
		}

		public Task StartAsync(CancellationToken cancellationToken)
		{
			throw new Exception();
		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			throw new System.NotImplementedException();
		}
	}
}
