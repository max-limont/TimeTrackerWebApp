using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Text;
using TimeTrackerApp.Business.Models;
using Microsoft.Extensions.Configuration;


namespace TimeTrackerApp.Business.Services
{
	public static class JwtTokenService
	{

		public static IConfiguration Configuration { get; set; } = null!;

		public static string GenerateJwtToken(IEnumerable<Claim> claims, int tokenDurationInSeconds)
		{
			var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:JWT_SECRET_KEY"]));
			var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
			var jwtSecurityToken = new JwtSecurityToken(
				issuer: Configuration["Jwt:JWT_TOKEN_ISSUER"],
				audience: Configuration["Jwt:JWT_TOKEN_AUDIENCE"],
				notBefore: DateTime.Now,
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

		public static string GenerateAccessToken(User user) => GenerateJwtToken(GetJwtTokenClaims(user), 600);

		public static string GenerateRefreshToken(User user) => GenerateJwtToken(GetJwtTokenClaims(user), 2592000);
	}
}
