using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;

namespace TimeTrackerApp.Services;

public class SignalHub:Hub
{
    private IUserRepository UserRepository;
    public SignalHub(IUserRepository userRepository)
    {
        UserRepository = userRepository;
    }

    public async Task ConnectUser(string email, string password)
    {
        var user =  await UserRepository.GetByEmailAsync(email);
        if (!PasswordService.CompareWithHash(user.Password, password))
        {
            throw new Exception("Wrong password!");
        }
        
        await Groups.AddToGroupAsync(Context.ConnectionId, "AuthUser");
    }
}
