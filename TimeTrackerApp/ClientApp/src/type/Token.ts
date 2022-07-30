export type Token = {
    accessToken: string,
    refreshToken: string,
}

export const EmptyToken:Token = {
    accessToken: '',
    refreshToken: '',
}