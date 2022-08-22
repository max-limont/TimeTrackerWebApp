using System.Collections.Generic;

namespace TimeTrackerApp.Helpers
{
	public static class Constants
	{
		public static readonly string AuthenticationScheme = "CustomAuthenticationScheme";
		public static readonly string JwtSecretKey = "JWT_SECRET_KEY";
		public static readonly string JwtTokenIssuer = "JWT_TOKEN_ISSUER";
		public static readonly string JwtTokenAudience = "JWT_TOKEN_AUDIENCE";
		public static readonly string DatabaseConnectionString = "MsSqlConnection";
		public static readonly string DatabaseConnectionStringAzure = "MsSqlAzure";
		public static readonly string AutoCreateRecordsTaskCron = "AutoCreateRecordsTaskCron";

		public static readonly List<string> BackgroundTaskTypes = new List<string>
		{
			"AutoCreateRecordsTask",
		};
	}
}
