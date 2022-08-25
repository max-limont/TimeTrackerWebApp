export type SickLeave = {
    id: number,
    startDate: Date,
    endDate: Date,
    employeeId: number,
    approverId: number,
    status: SickLeaveStatuses,
    creationDateTime: Date,
}

export enum SickLeaveStatuses {
    Expired,
    UnderReview,
    Approved,
    Rejected
}

export type SickLeaveInputType = {
    id?: number | null,
    startDate: Date,
    endDate: Date,
    employeeId: number,
    approverId?: number | null,
    status?: SickLeaveStatuses | null,
    creationDateTime?: Date | null
}