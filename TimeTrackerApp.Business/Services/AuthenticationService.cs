using Microsoft.AspNetCore.SignalR;
using TimeTrackerApp.Business.Models;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Services;

namespace TimeTrackerApp.Business.Services
{
	public class AuthenticationService
	{
        private IUserRepository userRepository { get; set; }
        private IAuthenticationTokenRepository authenticationTokenRepository { get; set; }
        private SignalHub _signalHub { get; set; }

        public class AuthenticationResponse
		{
            public string? AccessToken { get; set; }
            public string? RefreshToken { get; set; }

            public AuthenticationResponse() { }

            public AuthenticationResponse(string accessToken, string refreshToken)
			{
                AccessToken = accessToken;
                RefreshToken = refreshToken;
			}
		}

        public AuthenticationService(SignalHub hubContext,IUserRepository userRepository, IAuthenticationTokenRepository authenticationTokenRepository)
        {
	        _signalHub = hubContext;
            this.userRepository = userRepository;
            this.authenticationTokenRepository = authenticationTokenRepository;
		}

		public async Task<AuthenticationResponse> Login(string email, string password)
		{
            try
            {
                var user = await userRepository.GetByEmailAsync(email,1);
                if (!PasswordService.CompareWithHash(user.Password, password))
                {
                    throw new Exception("Wrong password!");
                }
                if (user.Activation == false)
                {
	                throw new Exception("User blocked");
                }
                await _signalHub.ConnectUser(email, password);
                
                var accessToken = JwtTokenService.GenerateAccessToken(user);
                var refreshToken = JwtTokenService.GenerateRefreshToken(user);
                var refreshTokenDb = new AuthenticationToken()
                {
                    UserId = user.Id,
                    Token = refreshToken
                };
                await authenticationTokenRepository.CreateAsync(refreshTokenDb);
                return new AuthenticationResponse(accessToken, refreshToken);
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }

        public async Task<AuthenticationResponse> Logout(int userId)
		{
            try
            {
                await authenticationTokenRepository.RemoveByUserIdAsync(userId);
                return new AuthenticationResponse();
            }
            catch (Exception exception)
            {
                throw new Exception(exception.Message);
            }
        }

        public async Task<AuthenticationResponse> Refresh(int userId, string accessToken, string refreshToken)
		{
            if (JwtTokenService.VaildateJwtToken(accessToken))
			{
                return new AuthenticationResponse(accessToken, refreshToken);
			}

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
                    await _signalHub.ConnectUserWithHashPassword(user.Email,user.Password);
                    await authenticationTokenRepository.UpdateByUserIdAsync(userId, newRefreshToken);
                    return new AuthenticationResponse(newAccessToken, newRefreshToken);
				}
                throw new Exception("Refresh tokens are different!");
            }
            catch (Exception exception)
			{
                throw new Exception(exception.Message);
			}
        }
	}
}
