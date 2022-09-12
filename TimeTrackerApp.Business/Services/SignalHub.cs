using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using TimeTrackerApp.Business.Enums;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Services;

namespace TimeTrackerApp.Services;

public class SignalHub:Hub
{
    public static Dictionary<int, string> connectedUser = new Dictionary<int, string>();
    
    private IUserRepository UserRepository;
    public SignalHub(IUserRepository userRepository)
    {
        UserRepository = userRepository;
    }
    public async Task ConnectUserWithHashPassword(string email, string password)
    {
        await AddUser(email, password, true);
    }
    public async Task ConnectUser(string email, string password)
    {
        await AddUser(email, password);
    }
    public async Task LogOut()
    {
        var model = connectedUser.FirstOrDefault(x => x.Value.Equals(Context.ConnectionId));
        connectedUser.Remove(model.Key);
        try
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "AuthUser");
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Admins");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
        await Clients.Group("Admins").SendAsync("online",$"{connectedUser.Count}");
    }

    public async Task Test()
    {
        var asd = 1;
    }

    private async Task AddUser(string email, string password,bool hashed=false)
    {
        var user =  await UserRepository.GetByEmailAsync(email);
        if (hashed==false)
        {
            if (!PasswordService.CompareWithHash(user.Password, password))
            {
                connectedUser.Add(user.Id, Context.ConnectionId);
                throw new Exception("Wrong password!");
            }
        }
        if (hashed)
        {
            if (!user.Password.Equals(password))
            {
                throw new Exception("error to refresh!");
            }
        }
        try
        {
            connectedUser[user.Id] = Context.ConnectionId;
        }
        catch 
        {
            connectedUser.Add(user.Id,Context.ConnectionId);
            Console.WriteLine("New User");
        }
        
        await Groups.AddToGroupAsync(Context.ConnectionId, "AuthUser");
        if ((user.PrivilegesValue& Convert.ToInt32(Privileges.WatchUsers))>0)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
        }

        await Clients.Group("Admins").SendAsync("online",$"{connectedUser.Count}");
    }
}