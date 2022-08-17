import {User} from "./user.types";

export type Record = {
    id?: number | null
    workingTime: number
    employeeId: number
    editorId?: number | null
    isAutomaticallyCreated: boolean
    createdAt: Date
}

export type TimeTrackerItem = {
    id?: number | null
    date: Date
    begin: number
    end: number
    duration: number
    isAutomaticallyCreated: boolean
    editor?: User | null
}

export type FetchAllUserRecordsInputType = {
    userId: number
}

export type CreateRecordInputType = {
    record: Record
}

export type UpdateRecordInputType = {
    record: Record
}

export type DeleteRecordInputType = {
    id: number
}