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

export type AuthUserType = {
    email: string,
    password: string
}
export enum UserPrivileges
{
    WatchUsers = 1,
    CreateUsers = 2,
    EditUsers = 4,
    ManageCalendarNotes = 8,
    ManageSickLeaves = 16,
    ApproveAndRejectVacations = 32
}


// export interface UserCreateData {
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string,
//     isFullTimeEmployee: boolean
// }