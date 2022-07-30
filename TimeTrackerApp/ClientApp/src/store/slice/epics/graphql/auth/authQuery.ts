export const authUserQuery = `
mutation ($user: UserLogin!){
    auth_login(user: $user){
        refreshToken,
        accessToken,
        responseMessage
    }
  }
}
`