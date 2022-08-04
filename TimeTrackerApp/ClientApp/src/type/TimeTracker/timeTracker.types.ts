export type TimeTrackerItem = {
    id?: number
    date: Date
    begin: number
    end: number
    duration: number
    comment?: string | null
}