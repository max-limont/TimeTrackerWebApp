using Quartz;
using System;
using System.Threading.Tasks;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.BackgroundTasks
{
	public class AutoCreateRecordsTask : IJob
	{
		private readonly IUserRepository userRepository;
		private readonly IRecordRepository recordRepository;

		public AutoCreateRecordsTask(IUserRepository userRepository, IRecordRepository recordRepository)
		{
			this.userRepository = userRepository;
			this.recordRepository = recordRepository;
		}

		public async Task Execute(IJobExecutionContext context)
		{
			var fullTimeEmployees = await userRepository.FetchFullTimeEmployeesAsync();
			foreach (var employee in fullTimeEmployees)
			{
				var record = new Record()
				{
					IsAutomaticallyCreated = true,
					CreatedAt = DateTime.UtcNow,
					WorkingTime = employee.WeeklyWorkingTime / 5 * 60 * 1000,
					EmployeeId = employee.Id,
				};

				try
				{
					await recordRepository.CreateAsync(record);
				}
				catch (Exception exception)
				{
					Console.WriteLine(exception.Message);
				}
			}
		}
	}
}
