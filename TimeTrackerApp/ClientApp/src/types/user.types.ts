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
    vacationPermissionId: number,
    teamId: number,
    roleId: number
}

export type GetUserByIdQueryInputType = {
    id: number
}

export type GetUserByEmailQueryInputType = {
    email: string
}