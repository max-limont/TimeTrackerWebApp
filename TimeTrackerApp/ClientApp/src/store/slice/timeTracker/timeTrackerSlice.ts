import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Record, TimeTrackerItem} from "../../../type/TimeTracker/timeTracker.types";
import {store} from "../../../app/store";


type TimeTrackerState = {
    records: Record[]
}

const initialState: TimeTrackerState = {
    records: []
}

export const timeTrackerSlice = createSlice({
    name: "timeTrackerSlice",
    initialState,
    reducers: {
        setRecords(state, action: PayloadAction<Record[]>) {
            return {...state, records: action.payload}
        },
        addRecord(state, action: PayloadAction<Record>) {
            return {...state, records: [...state.records, {...action.payload, id: state.records.length + 1}]}
        },
        editRecord(state, action: PayloadAction<Record>) {
            return {...state, records: state.records.map(record => record.id === action.payload.id ? action.payload : record)}
        },
        removeRecord(state, action: PayloadAction<number>) {
            return {...state, records: state.records.filter(record => record.id !== action.payload)}
        }
    }
})

export const {setRecords, addRecord, editRecord, removeRecord} = timeTrackerSlice.actions;
export const timeTrackerReducer = timeTrackerSlice.reducer;

export const recordToTimeTrackerListItem = (record: Record): TimeTrackerItem => {
    return {
        id: record.id,
        date: record.createdAt,
        begin: record.createdAt.getTime(),
        duration: record.workingTime,
        end: record.createdAt.getTime() + record.workingTime,
        comment: record.comment,
        editor: store.getState().rootReducer.userList.userList.find(user => user.id === record.editorId)
    }
}