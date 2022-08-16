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

export interface UserListPage{
    from: number,
    contentPerPage: number,
    orderBy: string
    isReverse: boolean
}