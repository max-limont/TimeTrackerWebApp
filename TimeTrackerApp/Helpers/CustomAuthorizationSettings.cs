using GraphQL.Authorization;

namespace TimeTrackerApp.Helpers
{
	public class CustomAuthorizationSettings : AuthorizationSettings
	{
		public CustomAuthorizationSettings()
		{
			AddPolicy("LoggedIn", policy => policy.RequireAuthenticatedUser());
		}
	}
}
