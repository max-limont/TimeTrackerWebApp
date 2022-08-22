export type AuthUserResponse = {
    UserId: string,
    UserEmail: string,
    UserPrivilegesValue: number,
    exp: number,
    iss: string,
    aud: string
}

export type AuthorizationUser = {
    email: string,
    password: string
}

export type AuthRefreshInputType = {
    userId: number,
    accessToken: string,
    refreshToken: string
}

export type AuthLoginInputType = {
    email: string,
    password: string
}

export type AuthLogoutInputType = {
    userId: number
}