export type User = {
    id: number,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    weeklyWorkingTime: number,
    remainingVacationDays: number,
    privilegesValue: number
}


export const EmptyUser:User ={
    id: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    weeklyWorkingTime: 0,
    remainingVacationDays: 0,
    privilegesValue: 0
}

export interface UserListPage{
    from: number,
    contentPerPage: number,
    orderBy: string | null
    isReverse: boolean | null
}