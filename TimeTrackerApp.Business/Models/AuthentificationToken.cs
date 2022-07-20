namespace TimeTrackerApp.Business.Models
{
	public class AuthentificationToken
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Token { get; set; } = string.Empty;
	}
}
