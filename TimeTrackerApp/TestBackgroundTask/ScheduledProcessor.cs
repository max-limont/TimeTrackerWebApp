using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using NCrontab;

namespace TimeTrackerApp.Business.Services;

public abstract class ScheduledProcessor:ScopeProccess
{
    private CrontabSchedule schedule;
    private DateTime nextRun;

    protected abstract string Schedule { get;}

    public ScheduledProcessor(IServiceScopeFactory service):base(service)
    {
        schedule = CrontabSchedule.Parse(Schedule);
        nextRun = schedule.GetNextOccurrence(DateTime.Now);
    }
    protected override async Task ExecutingTask(CancellationToken token)
    {
        do
        {
            var now = DateTime.Now;
            if (now>nextRun)
            {
                await Process();
                nextRun = schedule.GetNextOccurrence(DateTime.Now);
            }
            await Task.Delay(5000, token);
        } while (!token.IsCancellationRequested);
    }
}