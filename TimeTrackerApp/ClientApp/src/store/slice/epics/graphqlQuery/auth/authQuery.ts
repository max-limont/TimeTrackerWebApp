export const authUserQuery = `
mutation ($user: UserLogin!){
    auth_login(user: $user){
        refreshToken,
        accessToken,
        responseMessage
    }
  }
`

export const refreshTokenUpdate= `
mutation ($id: Int!, $refresh: String!){
    auth_refresh(userId: $id, refreshToken: $refresh){
      refreshToken,
      accessToken,
      responseMessage
    }
  }
}`