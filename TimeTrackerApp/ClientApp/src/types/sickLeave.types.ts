import {User} from "./user.types";

export type SickLeave = {
    id: number,
    startDate: Date,
    endDate: Date,
    employeeId: number,
    approverId: number,
    status: SickLeaveStatuses,
    creationDateTime: Date,
    approver?: User | null
}

export type SickLeaveInputType = {
    id?: number | null,
    startDate: Date,
    endDate: Date,
    employeeId: number,
    approverId?: number | null,
    status?: SickLeaveStatuses | null,
    creationDateTime?: Date | null,
}

export enum SickLeaveStatuses {
    Expired,
    UnderReview,
    Approved,
    Rejected
}

export type SickLeaveStatusDataType = {
    className: string,
    value: string
}

export type FetchAllSickLeavesByEmployeeIdQueryInputType = {
    employeeId: number
}

export type FetchAllSickLeavesForManagerByManagerIdQueryInputType = {
    managerId: number
}

export type GetSickLeaveByIdInputType = {
    id: number
}

export type CreateSickLeaveMutationInputType = {
    sickLeave: SickLeaveInputType
}

export type UpdateSickLeaveMutationInputType = {
    sickLeave: SickLeaveInputType
}

export type RemoveSickLeaveMutationInputType = {
    id: number
}