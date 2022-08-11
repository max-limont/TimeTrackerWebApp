import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";
import { EventType } from "../../../type/Events/EventType";

type CalendarStateType = {
    totalDays: number,
    currentDaysArray: Moment[],
    currentDate: string,
    events: EventType[],
    eventsRange: EventType[],
    currentCalendar: Moment,
    startDay: Moment,
    currentDateMoment: Moment,
    currentDateList: string
}

const initialState: CalendarStateType = {
    events: [],
    eventsRange: [],
    totalDays: 42,
    currentDaysArray: [],
    currentDate: '',
    currentDateList: '',
    currentCalendar: moment(),
    startDay: moment().clone().startOf("month").startOf("week"),
    currentDateMoment: moment()
};

export const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState,
    reducers: {
        initCalendar: (state: CalendarStateType) => {
            moment.updateLocale("en", { week: { dow: 0 } });
            const day = moment().clone().startOf("month").startOf("week")
            return {
                ...state,
                currentDate: moment().format("yyyy-MM-DD"),
                currentCalendar: moment(),
                startDay: day.clone(),
                currentDaysArray: [...Array(state.totalDays)].map(() => day.add(1, "day").clone()),
            }
        },
        prevMonth: (state: CalendarStateType) => {
            const day = state.currentCalendar.subtract(1, "month").clone()
            return {
                ...state,
                currentCalendar: day.clone(),
                startDay: day.startOf("month").startOf("week").clone(),
                currentDaysArray: [...Array(state.totalDays)].map(() => day.add(1, "day").clone()),
            }
        },
        nextMonth: (state: CalendarStateType) => {
            const day = state.currentCalendar.add(1, "month").clone()
            return {
                ...state,
                currentCalendar: day.clone(),
                startDay: day.startOf("month").startOf("week").clone(),
                currentDaysArray: [...Array(state.totalDays)].map(() => day.add(1, "day").clone()),
            }
        },
        addEvent: (state:CalendarStateType, action: PayloadAction<EventType>) => {
            console.log(action.payload);
            return {
                ...state,
                events: state.events.concat(action.payload)
            }
        },
        setCurrentDateList: (state, action:PayloadAction<string>)=>{
            return{
                ...state,
                currentDateList: action.payload
            }
        },
        editEvent: (state, action:PayloadAction<EventType>)=>{
            const i = state.events.findIndex(item => item.id == action.payload.id);
            let events = state.events.slice();
            events[i] = action.payload;
            return {...state, events: events}
        },
        removeEvent: (state: CalendarStateType, action:PayloadAction<number>) => {
            return {...state, events: state.events.filter(item => item.id !== action.payload)}
        },
        setEvents: (state,action:PayloadAction<EventType[]>)=>{
            console.log(action.payload);
            return{
                ...state,
                events: action.payload
            }
        },
        setRangeEvents: (state,action:PayloadAction<EventType[]>)=>{
            console.log( action.payload);
            return{
                ...state,
                eventsRange: action.payload
            }
        },

    }
})

export default calendarSlice;
export const { initCalendar, prevMonth, nextMonth ,addEvent,setCurrentDateList,editEvent,setRangeEvents, removeEvent,setEvents} = calendarSlice.actions;

