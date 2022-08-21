using Quartz;
using System.Threading.Tasks;
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
			
		}
	}
}
