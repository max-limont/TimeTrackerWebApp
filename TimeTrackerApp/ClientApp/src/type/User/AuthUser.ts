export type AuthUser = {
    email: string,
    password: string,
}

export const EmptyAuthUser:AuthUser = {
    email: '',
    password: '',
}