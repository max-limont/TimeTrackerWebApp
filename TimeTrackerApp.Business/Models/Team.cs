namespace TimeTrackerApp.Business.Models;

public class Team
{
    public int Id { get; set; }
    public string NameTeam { get; set; }
    public List<User> Users { get; set; }
}