export const authLoginQuery = `
    mutation AuthLogin($email: String!, $password: String!) {
        authLogin(email: $email, password: $password) {
            refreshToken
            accessToken
        }
    }
`

export const authRefreshQuery = `
    mutation AuthRefresh($userId: ID!, $accessToken: String!, $refreshToken: String!) {
        authRefresh(userId: $userId, accessToken: $accessToken, refreshToken: $refreshToken) {
            refreshToken
            accessToken
        }
    }
`

export const authLogoutQuery = `
    mutation UserLogout($userId: ID!) {
        authLogout(userId: $userId) {
            accessToken
            refreshToken
        }
    }
`