using System.Security.Claims;

namespace TimeTrackerApp.Services;

public class ActionPayload
{
    public string Type { get; set; }
    public int IssuerMessage { get; set; }/*-> для того чтобы узнать кто отослал (id message)*/
    public Claim[] Data { get; set; }
}
