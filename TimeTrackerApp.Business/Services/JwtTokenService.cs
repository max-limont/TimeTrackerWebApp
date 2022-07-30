using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Text;
using TimeTrackerApp.Business.Models;

namespace TimeTrackerApp.Business.Services
{
	public static class JwtTokenService
	{
		private static readonly string jwtSecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY")!;
		
		public static string GenerateJwtToken(IEnumerable<Claim> claims, int tokenDurationInSeconds)
		{
			var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey));
			var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
			var jwtSecurityToken = new JwtSecurityToken(
				issuer: Environment.GetEnvironmentVariable("JWT_TOKEN_ISSUER"),
				audience: Environment.GetEnvironmentVariable("JWT_TOKEN_AUDIENCE"),
				claims: claims,
				expires: DateTime.Now.AddSeconds(tokenDurationInSeconds),
				signingCredentials: credentials
			);
			return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
		}

		public static IEnumerable<Claim> GetJwtTokenClaims(User user)
		{
			return new List<Claim>
			{
				new Claim("UserId", user.Id.ToString()),
				new Claim("UserEmail", user.Email),
				new Claim("UserPrivilegesValue", user.PrivilegesValue.ToString())
			};
		}

		public static string GenerateAccessToken(User user) => GenerateJwtToken(GetJwtTokenClaims(user), 120);

		public static string GenerateRefreshToken(User user) => GenerateJwtToken(GetJwtTokenClaims(user), 2592000);
	}
}
