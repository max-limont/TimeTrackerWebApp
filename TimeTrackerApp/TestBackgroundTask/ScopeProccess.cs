using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace TimeTrackerApp.Business.Services;

public abstract class ScopeProccess:BackgroundService
{
    private IServiceScopeFactory serviceScopeFactory { get; set; }

    public ScopeProccess(IServiceScopeFactory serviceScopeFactory):base()
    {
        this.serviceScopeFactory = serviceScopeFactory;
    }
    
    protected override async Task Process()
    {
        using (var scope = serviceScopeFactory.CreateScope())
        {
            await ProcessInScope(scope.ServiceProvider);
        } 
    }
    
  
    public abstract Task ProcessInScope(IServiceProvider scopeServiceProvider);
}