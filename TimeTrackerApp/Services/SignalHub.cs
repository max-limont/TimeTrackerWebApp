using System;
using System.ComponentModel.Design.Serialization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;

namespace TimeTrackerApp.Services;

public class SignalHub:Hub
{
    public IHttpContextAccessor Accessor;
    public SignalHub(IHttpContextAccessor accessor)
    {
        Accessor = accessor;
    }
}
