import {User} from "../User/User";

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