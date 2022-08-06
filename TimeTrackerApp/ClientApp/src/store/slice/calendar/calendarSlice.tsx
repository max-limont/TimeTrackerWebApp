import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment, { Moment } from "moment";
import { EventType } from "../../../type/Events/EventType";

interface calendarState {
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

const initialState: calendarState = {
    events: [],
    eventsRange: [],
    totalDays: 42,
    currentDaysArray: [],
    currentDate: '',
    currentDateList: '',
    currentCalendar: moment(),
    startDay: moment().clone().startOf("month").startOf("week"),
    currentDateMoment: moment()
}
const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState,
    reducers: {
        initCalendar: (state) => {
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
        prevMonth: (state) => {

            const day = state.currentCalendar.subtract(1, "month").clone()

            return {
                ...state,
                currentCalendar: day.clone(),
                startDay: day.startOf("month").startOf("week").clone(),
                currentDaysArray: [...Array(state.totalDays)].map(() => day.add(1, "day").clone()),

            }
        },
        nextMonth: (state) => {

            const day = state.currentCalendar.add(1, "month").clone()

            return {
                ...state,
                currentCalendar: day.clone(),
                startDay: day.startOf("month").startOf("week").clone(),
                currentDaysArray: [...Array(state.totalDays)].map(() => day.add(1, "day").clone()),

            }
        },
        addEvent: (state, action: PayloadAction<EventType>) => {
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
            var events = state.events.slice();
            events[i] = action.payload;
            return {...state, events: events}
        },
        editRangeEvent: (state, action:PayloadAction<EventType>)=>{
            const i = state.eventsRange.findIndex(item => item.id == action.payload.id);
            var eventsRange = state.eventsRange.slice();
            eventsRange[i] = action.payload;
            return {...state, eventsRange: eventsRange}
        },
        removeEvent: (state, action:PayloadAction<number>) => {
            return { ...state, events: state.events.filter(item => item.id !== action.payload) }
        },
        removeEventFromRange: (state, action:PayloadAction<number>) => {
            return { ...state, events: state.eventsRange.filter(item => item.id !== action.payload) }
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