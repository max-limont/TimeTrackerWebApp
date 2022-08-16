export type CreateCalendarDayType = {
    title: string,
    date: Date,
    dayTypeId?: number | null,
    endDate?: Date | null,
}

export const CreateEventObject : CreateCalendarDayType = {
    title: '',
    date: new Date(),
    endDate: null,
    dayTypeId:null,
}