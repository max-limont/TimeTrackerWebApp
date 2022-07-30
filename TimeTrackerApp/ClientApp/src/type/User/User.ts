export type User = {
    id: number,
    email: string,
    password: string,
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