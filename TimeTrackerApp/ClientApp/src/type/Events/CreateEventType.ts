export type CreateEventType = {
    title: string,
    date: string,
    typeDayId: number|null,
    endDate: string|null,
}

export const CreateEventObject:CreateEventType = {
    title: '',
    date: '',
    endDate: null,
    typeDayId:null,
}