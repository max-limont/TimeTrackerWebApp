export type CalendarTypes = {
    id?: number | null,
    title: string,
    date: Date,
    dayTypeId?: number | null,
    endDate?: Date | null,
}

export type CreateCalendarDayType = {
    title: string,
    date: Date,
    dayTypeId?: number | null,
    endDate?: Date | null,
}

export type DateInputType = {
    startDate: Date,
    finishDate: Date
}

export enum DayTypes {
    Default,
    Weekend,
    ShortDay
}

export type FetchCalendarDaysRangeInputType = {
    startDate: string,
    finishDate: string
}

export type GetCalendarDayByIdInputType = {
    id: number
}

export type CreateCalendarDayInputType = {
    calendarDay: CreateCalendarDayType
}

export type EditCalendarDayInputType = {
    calendarDay: CalendarTypes
}

export type RemoveCalendarDayInputType = {
    id: number
}