using Quartz;
using System;
using System.Threading.Tasks;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.BackgroundTasks
{
	public class AutoCreateRecordsTask : IBackgroundTask
	{
		private readonly IUserRepository userRepository;
		private readonly IRecordRepository recordRepository;
		private readonly IBackgroundTaskRepository backgroundTaskRepository;

		public AutoCreateRecordsTask(IUserRepository userRepository, IRecordRepository recordRepository, IBackgroundTaskRepository backgroundTaskRepository)
		{
			this.userRepository = userRepository;
			this.recordRepository = recordRepository;
			this.backgroundTaskRepository = backgroundTaskRepository;
		}

		public string TaskType => GetType().Name;

		public async Task Execute(IJobExecutionContext context)
		{
			await Execute(context, new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day, 12, 0, 0).ToUniversalTime());
		}

		public async Task Execute(IJobExecutionContext context, DateTime dateTime)
		{
			var fullTimeEmployees = await userRepository.FetchFullTimeEmployeesAsync();
			foreach (var employee in fullTimeEmployees)
			{
				var record = new Record()
				{
					IsAutomaticallyCreated = true,
					CreatedAt = dateTime,
					WorkingTime = employee.WeeklyWorkingTime / 5 * 60 * 1000,
					EmployeeId = employee.Id,
				};

				try
				{
					var backgroundTask = new BackgroundTask()
					{
						Type = nameof(AutoCreateRecordsTask),
						DateTime = dateTime,
					};
					await recordRepository.CreateAsync(record);
					await backgroundTaskRepository.CreateAsync(backgroundTask);
				}
				catch (Exception exception)
				{
					Console.WriteLine(exception.Message);
				}
			}
		}
	}
}
