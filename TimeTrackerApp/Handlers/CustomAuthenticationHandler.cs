using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using TimeTrackerApp.Helpers;

namespace TimeTrackerApp.Handlers
{
	public class CustomAuthenticationSchemeOptions : AuthenticationSchemeOptions { }
	public class CustomAuthenticationHandler : AuthenticationHandler<CustomAuthenticationSchemeOptions>
	{
		private IConfiguration configuration;
		public CustomAuthenticationHandler(IOptionsMonitor<CustomAuthenticationSchemeOptions> options, ILoggerFactory loggerFactory, UrlEncoder uriEncoder, ISystemClock systemClock, IConfiguration configuration) : base(options, loggerFactory, uriEncoder, systemClock)
		{
			this.configuration = configuration;
		}

		protected override Task<AuthenticateResult> HandleAuthenticateAsync()
		{
			if (!Request.Headers.ContainsKey(HeaderNames.Authorization))
			{
				return Task.FromResult(AuthenticateResult.Fail("Authorization header was not found!"));
			}

			var authorizationHeader = Request.Headers[HeaderNames.Authorization].ToString();
			var jwtAccessToken = authorizationHeader.Replace("Bearer ", string.Empty);
			if (jwtAccessToken is not null) {
				var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
				var jwtSecretKey = Encoding.UTF8.GetBytes(configuration[$"Jwt:{Constants.JwtSecretKey}"]);
				try
				{	
					var claimsPrincipal = jwtSecurityTokenHandler.ValidateToken(jwtAccessToken, new TokenValidationParameters
					{
						ValidateIssuerSigningKey = true,
						IssuerSigningKey = new SymmetricSecurityKey(jwtSecretKey),
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidAudience = configuration[$"Jwt:{Constants.JwtTokenAudience}"],
						ValidIssuer = configuration[$"Jwt:{Constants.JwtTokenIssuer}"],
						ValidateLifetime = true,
					}, out var securityToken);

					var userId = int.Parse(claimsPrincipal.Claims.First(claim => claim.Type == "UserId").Value);
					var authenticationTicket = new AuthenticationTicket(claimsPrincipal, new AuthenticationProperties { IsPersistent = false }, Constants.AuthenticationScheme);
					return Task.FromResult(AuthenticateResult.Success(authenticationTicket));
				} 
				catch (Exception exception)
				{
					return Task.FromResult(AuthenticateResult.Fail(exception.Message));
				}
			}
			return Task.FromResult(AuthenticateResult.Fail("Wrong jwt access token!"));
		}
	}
}
