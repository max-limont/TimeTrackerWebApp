namespace TimeTrackerApp.Business.Models;

public class VacationResponse
{
    public int Id { get; set; }
    public  int  VacationId { get; set; }
    public  int  UserId { get; set; }
    public string? Comment { get; set; } = String.Empty;
    public User? User { get; set; }
}