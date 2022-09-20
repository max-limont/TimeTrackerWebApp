using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;

namespace TimeTrackerApp.Business.Services;

public abstract class BackgroundService:IHostedService
{
    protected abstract Task Process();
    private Task executingTask;
    private int count = 0;
    private CancellationTokenSource stopToken = new CancellationTokenSource();
    
    public virtual Task StartAsync(CancellationToken cancellationToken)
    {
        executingTask = ExecutingTask(stopToken.Token);
        if (executingTask.IsCompleted)
        {
            return executingTask;
        }
        return Task.CompletedTask;
    }

    public virtual async Task StopAsync(CancellationToken cancellationToken)
    {
        if (executingTask == null)
            return ;

        try
        {
            stopToken.Cancel();
        }
        finally
        {
            await Task.WhenAny(executingTask, Task.Delay(Timeout.Infinite, cancellationToken));
        }
       
    }  
    protected virtual async Task ExecutingTask(CancellationToken token)
    {
        do
        {
            await Process();

            await Task.Delay(5000, token); 
        } while (!token.IsCancellationRequested);
    }
    

}