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

export const EmptyAuthUser: AuthorizationUser = {
    email: '',
    password: "",
}