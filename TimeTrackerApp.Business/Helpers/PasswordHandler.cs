using System.Security.Cryptography;
using System.Text;

namespace TimeTrackerApp.Business.Helpers
{
	public static class PasswordHandler
	{
		private static class Salt
		{
			public static readonly string Prefix = "ZW7M@%;qhEvl_AUC@252CCTVobt8vz4%";
			public static readonly string Suffix = "xkK*QBrb*E&BL47i=P^j!cOJ#RxT*_F=";
		}

		public static string Encrypt(string password)
		{
			string saltedPassword = $"{Salt.Prefix}.{password}.{Salt.Suffix}";

			using (var hash = SHA256.Create())
			{
				byte[] bytes = hash.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
				StringBuilder builder = new StringBuilder();

				for (int i = 0; i < bytes.Length; i++)
				{
					builder.Append(bytes[i].ToString("x2"));
				}

				return builder.ToString();
			}
		} 

		public static bool CompareWithHash(string hash, string password)
		{
			return hash.Equals(Encrypt(password));
		}
	}
}
