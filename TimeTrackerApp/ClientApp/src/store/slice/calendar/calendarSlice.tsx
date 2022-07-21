import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface calendarState {
    totalDays: number,
    currentDaysArray: moment.Moment[],
    currentDate: string,
    
    currentCalendar: moment.Moment
    startDay: moment.Moment,
    currentDateMoment: moment.Moment
}

const initialState: calendarState = {
    totalDays: 42,
    currentDaysArray: [],
    currentDate: '',
    currentCalendar: moment(),
    startDay:  moment().clone().startOf("month").startOf("week"),
    currentDateMoment: moment().clone()
}
const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState,
    reducers: {
        initCalendar: (state) => {
            moment.updateLocale("en", { week: { dow: 0 } });
            const day =moment().clone().startOf("month").startOf("week")
            
            return {
                ...state,
                currentDate: moment().format("yyyy-MM-DD"),
                currentCalendar: moment(),
                startDay: day.clone(),
                currentDaysArray:  [...Array(state.totalDays)].map(()=>day.add(1, "day").clone()),
                currentDateMoment: moment().clone(),
                
            }
        },
        prevMonth: (state)=>{

            const day =state.currentCalendar.subtract(1,"month").clone()
            
            return{
                ...state,
                currentCalendar: day.clone(),
                startDay: day.startOf("month").startOf("week").clone(),
                currentDaysArray:   [...Array(state.totalDays)].map(()=>day.add(1, "day").clone()),

            }
        },
        nextMonth: (state)=>{

            const day =state.currentCalendar.add(1,"month").clone()
            
            return{
                ...state,
                currentCalendar: day.clone(),
                startDay: day.startOf("month").startOf("week").clone(),
                currentDaysArray:   [...Array(state.totalDays)].map(()=>day.add(1, "day").clone()),

            }
        }
    }
})

export default calendarSlice;
export const { initCalendar,prevMonth,nextMonth } = calendarSlice.actions;