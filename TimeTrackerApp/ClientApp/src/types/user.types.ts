export type User = {
    id: number,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    isFullTimeEmployee: boolean,
    weeklyWorkingTime: number,
    remainingVacationDays: number,
    privilegesValue: number
}

export type GetUserByIdQueryInputType = {
    id: number
}

export type GetUserByEmailQueryInputType = {
    email: string
}

// export interface UserCreateData {
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string,
//     isFullTimeEmployee: boolean
// }