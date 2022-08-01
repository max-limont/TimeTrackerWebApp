export const authUserQuery = `
mutation ($email: String!,$password: String!){
    auth_login(email: $email,password:$password){
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