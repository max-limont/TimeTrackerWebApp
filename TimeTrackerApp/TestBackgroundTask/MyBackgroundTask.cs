using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.Business.Services;

public class MyBackgroundTask:ScheduledProcessor
{
    private IUserRepository userRepository { get; set; }

    public MyBackgroundTask(IServiceScopeFactory serviceScopeFactory,IUserRepository userRepository):base(serviceScopeFactory)
    {
        this.userRepository = userRepository;
    }

    public override async Task ProcessInScope(IServiceProvider scopeServiceProvider)
    {
        Console.WriteLine(DateTime.Now);
        // var listModel =  await userRepository.FetchAllAsync();
        // listModel.Where(x=> x.)
    }

    protected override string Schedule  => "* * * * *";
}