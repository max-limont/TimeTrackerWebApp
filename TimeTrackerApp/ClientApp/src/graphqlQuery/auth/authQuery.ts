export const authLoginQuery = `
    mutation AuthLogin($email: String!, $password: String!) {
        authLogin(email: $email, password: $password) {
            refreshToken
            accessToken
        }
    }
`

export const authRefreshQuery = `
    mutation AuthRefresh($userId: ID!, $refreshToken: String!) {
        authRefresh(userId: $userId, refreshToken: $refreshToken) {
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

export type AuthRefreshInputType = {
    userId: number,
    refreshToken: string
}

export type AuthLoginInputType = {
    email: string,
    password: string
}

export type AuthLogoutInputType = {
    userId: number
}