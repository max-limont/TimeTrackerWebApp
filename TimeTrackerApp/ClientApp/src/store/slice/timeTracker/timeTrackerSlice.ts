import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { TimeTrackerItem } from "../../../type/TimeTracker/timeTracker.types";

type TimeTrackerState = {
    records: TimeTrackerItem[]
}

const initialState: TimeTrackerState = {
    records: []
}

export const timeTrackerSlice = createSlice({
    name: "timeTrackerSlice",
    initialState,
    reducers: {
        setRecords(state, action: PayloadAction<TimeTrackerItem[]>) {
            return {...state, records: action.payload}
        },
        addRecord(state, action: PayloadAction<TimeTrackerItem>) {
            return {...state, records: [...state.records, {...action.payload, id: state.records.length + 1}]}
        },
        editRecord(state, action: PayloadAction<TimeTrackerItem>) {
            return {...state, records: state.records.map(record => record.id === action.payload.id ? action.payload : record)}
        },
        removeRecord(state, action: PayloadAction<number>) {
            return {...state, records: state.records.filter(record => record.id !== action.payload)}
        }
    }
})

export const {setRecords, addRecord, editRecord, removeRecord} = timeTrackerSlice.actions;
export const timeTrackerReducer = timeTrackerSlice.reducer;