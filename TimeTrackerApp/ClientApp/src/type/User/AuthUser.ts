export type AuthUser = {
    email: string,
    id: number
}

export const EmptyAuthUser: AuthUser = {
    email: '',
    id: 0
}