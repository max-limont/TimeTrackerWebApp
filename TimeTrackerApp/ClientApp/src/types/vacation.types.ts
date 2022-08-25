import {User} from "./user.types";

export type  VacationType = {
    id: number,
    userId: number,
    startingTime: string,
    endingTime: string,
    comment: string,
    isAccepted: boolean | null,
    user: User | null,
    approveUsers: User[] | null,
    vacationResponse: VacationResponse | null
};

export type VacationResponse = {
    id: number,
    userId: number,
    comment: string,
    vacationId: number,
    user: User
};

export type CreateVacationType = {
    userId: number,
    startingTime: string,
    endingTime: string,
    comment: string
}

export type VacationLevelType = {
    id: number,
    nameLevel: string,
    value: number
}