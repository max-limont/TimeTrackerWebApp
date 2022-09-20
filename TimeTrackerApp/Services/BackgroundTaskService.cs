using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TimeTrackerApp.BackgroundTasks;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Helpers;

namespace TimeTrackerApp.Services
{
	public class BackgroundTaskService : IHostedService
	{
		private readonly IServiceProvider serviceProvider;

		public BackgroundTaskService(IServiceProvider serviceProvider)
		{
			this.serviceProvider = serviceProvider;
		}

		public async Task StartAsync(CancellationToken cancellationToken)
		{
			using var serviceScope = serviceProvider.CreateScope();
			var backgroundTasks = serviceScope.ServiceProvider.GetRequiredService<IEnumerable<IBackgroundTask>>();
			var userRepository = serviceScope.ServiceProvider.GetRequiredService<IUserRepository>();
			var recordRepository = serviceScope.ServiceProvider.GetRequiredService<IRecordRepository>();
			var backgroundTasksRepository = serviceScope.ServiceProvider.GetRequiredService<IBackgroundTaskRepository>();

			foreach (var type in Constants.BackgroundTaskTypes)
			{
				var latestBackgroundTask = await backgroundTasksRepository.GetLatestByTypeAsync(type);
				var timeHasPassedSinceLastExecution = latestBackgroundTask != null ? (new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, 12, 0, 0).ToUniversalTime() - latestBackgroundTask.DateTime).TotalSeconds : -1;
				switch (type)
				{
					case nameof(AutoCreateRecordsTask):
						if (timeHasPassedSinceLastExecution > 60 * 60 * 24 || timeHasPassedSinceLastExecution == -1)
						{
							var numberOfTasksToExecute = timeHasPassedSinceLastExecution == -1 ? 1 : timeHasPassedSinceLastExecution / 60 / 60 / 24;
							foreach (var task in backgroundTasks)
							{
								if (task.TaskType == type)
								{
									for (int i = 0; i < numberOfTasksToExecute; i++)
									{
										var dateTime = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, 12, 0, 0);
										if (latestBackgroundTask != null)
										{
											dateTime = new DateTime(latestBackgroundTask.DateTime.Year, latestBackgroundTask.DateTime.Month, latestBackgroundTask.DateTime.AddDays(i + 1).Day, 12, 0, 0);
										}
										await task.Execute(null, dateTime.ToUniversalTime());
									}
								}
							}
						}
						break;
				}
			}
		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			return Task.CompletedTask;
		}
	}
}
