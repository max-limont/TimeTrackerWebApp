export type User = {
    id: number,
    email: string,
    password?: string | null,
    firstName: string,
    lastName: string,
    weeklyWorkingTime: number,
    remainingVacationDays: number,
    privilegesValue: number,
    vacationPermissionId: number
}