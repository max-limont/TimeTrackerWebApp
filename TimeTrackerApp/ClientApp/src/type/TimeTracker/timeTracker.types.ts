import {User} from "../User/User";

export type Record = {
    id?: number
    workingTime: number
    comment?: string | null
    editorId?: number | null
    createdAt: Date
}

export type TimeTrackerItem = {
    id?: number
    date: Date
    begin: number
    end: number
    duration: number
    comment?: string | null
    editor?: User | null
}