import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CalendarDayType } from "../../../type/CalendarDay/CalendarDayType";
import {DayTypes} from "../../../enums/DayTypes";

export type CalendarDay = {
    date: Date,
    data: CalendarDayType[]
}

type CalendarStateType = {
    selectedMonth: Date,
    currentDate: Date,
    days: CalendarDay[]
}

const initialState: CalendarStateType = {
    selectedMonth: new Date(new Date().setFullYear(new Date().getFullYear(), new Date().getMonth(), 1)),
    currentDate: new Date(),
    days: []
}

export const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState,
    reducers: {
        initCalendar: (state: CalendarStateType) => {
            return {...state, selectedMonth: initialState.selectedMonth, days: getMonthCalendarDays(structuredClone(initialState.selectedMonth), [])}
        },
        previousMonth: (state: CalendarStateType) => {
            const previousMonth = new Date(structuredClone(state.selectedMonth).setMonth(state.selectedMonth.getMonth() - 1, 1))
            return {...state, selectedMonth: previousMonth}
        },
        nextMonth: (state: CalendarStateType) => {
            const nextMonth = new Date(structuredClone(state.selectedMonth).setMonth(state.selectedMonth.getMonth() + 1, 1))
            return {...state, selectedMonth: nextMonth}
        },
        createDay: (state, action: PayloadAction<CalendarDayType>) => {
            return {...state, days: state.days.map(day => isDateInDayRange(day.date, action.payload.date, action.payload.endDate) ? {...day, data: [...day.data, action.payload]} as CalendarDay : day)}
        },
        editDay: (state, action: PayloadAction<CalendarDayType>) => {
            const startDate = new Date(Math.min(state.days.find(calendarDay => calendarDay.data.find(_ => _.id === action.payload.id))?.date.getTime() ?? action.payload.date.getTime(), action.payload.date.getTime()));
            const endDate = new Date(Math.max(state.days.slice().reverse().find(calendarDay => calendarDay.data.find(_ => _.id === action.payload.id))?.date.getTime() ?? action.payload.date.getTime(), action.payload.endDate?.getTime() ?? action.payload.date.getTime()));
            return {...state, days: state.days.map(day => isDateInDayRange(day.date, startDate, endDate) ? {...day, data: day.data.find(calendarDay => calendarDay.id === action.payload.id && isDateInDayRange(day.date, action.payload.date, action.payload.endDate)) ? day.data.map(calendarDay => calendarDay.id === action.payload.id ? action.payload : calendarDay) : isDateInDayRange(day.date, action.payload.date, action.payload.endDate) ? [...day.data, action.payload] : day.data.filter(calendarDay => calendarDay.id !== action.payload.id)} as CalendarDay : day)}
        },
        removeDay: (state: CalendarStateType, action: PayloadAction<number>) => {
            return {...state, days: state.days.map(day => ({...day, data: day.data.filter(calendarDay => calendarDay.id !== action.payload)} as CalendarDay))}
        },
        setDays: (state, action: PayloadAction<CalendarDayType[]>) => {
            const days = getMonthCalendarDays(structuredClone(state.selectedMonth), action.payload)
            return {...state, days: days}
        },
        setDaysRange: (state,action: PayloadAction<CalendarDayType[]>) => {
            return {...state, daysRange: action.payload}
        },
    }
})

export default calendarSlice;
export const {initCalendar, previousMonth, nextMonth, createDay, editDay, setDaysRange, removeDay, setDays} = calendarSlice.actions;

export const getMonthCalendarDays = (date: Date, calendarDaysData: CalendarDayType[]): CalendarDay[] => {
    const firstDayOfWeek = new Date(structuredClone(date).setDate(1)).getDay() === 0 ? 6 : date.getDay() - 1
    const lastDay = new Date(date.setMonth(structuredClone(date).getMonth() + 1, 0))
    const lastDayOfWeek = lastDay.getDay() === 0 ? 6 : date.getDay() - 1
    const startDate = new Date(structuredClone(date).setDate(1 - firstDayOfWeek))
    const endDate = new Date(structuredClone(date).setDate(lastDay.getDate() - lastDayOfWeek + 6))
    let calendarDays: CalendarDay[] = []
    for (let day: Date = startDate; day <= endDate; day = new Date(new Date(day).setDate(new Date(day).getDate() + 1))) {
        day.setHours(0, 0, 0, 0)
        const dayData = calendarDaysData.filter(calendarDay => isDateInDayRange(day, calendarDay.date, calendarDay.endDate))
        const calendarDay: CalendarDay = {
            date: day,
            data: day.getDay() % 6 == 0 ? [{ title: 'Day off', date: day, dayTypeId: DayTypes.Weekend.valueOf() } as CalendarDayType, ...dayData] : dayData
        }
        calendarDays = [...calendarDays, calendarDay]
    }
    return calendarDays
}

export const compareDate = (dateA: Date, dateB: Date) => dateA.getFullYear() === dateB.getFullYear() && dateA.getMonth() === dateB.getMonth() && dateA.getDate() === dateB.getDate()

const isDateInDayRange = (date: Date, startDate?: Date | null, endDate?: Date | null) => {
    startDate = startDate ?? new Date(1e16)
    endDate = endDate ?? startDate
    return date >= startDate && date <= endDate || compareDate(date, startDate) || compareDate(date, endDate)
}