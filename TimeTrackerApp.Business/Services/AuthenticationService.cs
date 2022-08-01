using Microsoft.Extensions.Configuration;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;

namespace TimeTrackerApp.Business.Services
{
	public class AuthenticationService
	{
        private IUserRepository userRepository;
        private IAuthenticationTokenRepository authenticationTokenRepository;

        public class AuthenticationResponse
		{
            public string? AccessToken { get; set; }
            public string? RefreshToken { get; set; }
            public string? Message { get; set; }

            public AuthenticationResponse(string accessToken, string refreshToken)
			{
                AccessToken = accessToken;
                RefreshToken = refreshToken;
			}

            public AuthenticationResponse(string accessToken, string refreshToken, string message)
			{
                AccessToken = accessToken;
                RefreshToken = refreshToken;
                Message = message;  
			}

            public AuthenticationResponse(string message)
			{
                Message = message;
			}
		}

        public AuthenticationService(IUserRepository userRepository, IAuthenticationTokenRepository authenticationTokenRepository)
		{
            this.userRepository = userRepository;
            this.authenticationTokenRepository = authenticationTokenRepository;
		}

		public async Task<AuthenticationResponse> Login(string email, string password)
		{
            try
            {
                var user = await userRepository.GetByEmailAsync(email);
                if (!PasswordService.CompareWithHash(user.Password, password))
                {
                    return new AuthenticationResponse("Wrong password!");
                }
                var accessToken = JwtTokenService.GenerateAccessToken(user);
                var refreshToken = JwtTokenService.GenerateRefreshToken(user);
                var refreshTokenDb = new AuthenticationToken()
                {
                    UserId = user.Id,
                    Token = refreshToken
                };
                await authenticationTokenRepository.CreateAsync(refreshTokenDb);
                return new AuthenticationResponse(accessToken, refreshToken, "Jwt tokens have been successfully received!");
            }
            catch (Exception exception)
            {
                return new AuthenticationResponse(exception.Message);
            }
        }

        public async Task<AuthenticationResponse> Logout(int userId)
		{
            try
            {
                await authenticationTokenRepository.RemoveByUserIdAsync(userId);
                return new AuthenticationResponse("User has successfully been logged out!");
            }
            catch (Exception exception)
            {
                return new AuthenticationResponse(exception.Message);
            }
        }

        public async Task<AuthenticationResponse> Refresh(int userId, string refreshToken)
		{
            try
			{
                var user = await userRepository.GetByIdAsync(userId);
                var userRefreshTokenDb = await authenticationTokenRepository.GetByUserIdAsync(userId);
                if (userRefreshTokenDb.Token == refreshToken)
				{
                    var newAccessToken = JwtTokenService.GenerateAccessToken(user);
                    var newRefreshToken = JwtTokenService.GenerateRefreshToken(user);
                    userRefreshTokenDb = new AuthenticationToken()
                    {
                        UserId = user.Id,
                        Token = newRefreshToken,
                    };
                    await authenticationTokenRepository.RemoveByUserIdAsync(userId);
                    await authenticationTokenRepository.CreateAsync(userRefreshTokenDb);
                    return new AuthenticationResponse(newAccessToken, newRefreshToken, "Jwt tokens have been successfully refreshed!");
				}
                return new AuthenticationResponse("Refresh tokens are different!");
			}
            catch (Exception exception)
			{
                return new AuthenticationResponse(exception.Message);
			}
		}
	}
}
