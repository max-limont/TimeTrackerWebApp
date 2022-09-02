using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace TimeTrackerApp.Services;

public class SignalHub:Hub
{
    public async Task<string> Response()
    {
        return  "";
    }
}