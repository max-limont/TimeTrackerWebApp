import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Record, TimeTrackerItem} from "../../types/timeTracker.types";
import {store} from "../store";

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
        setRecords: (state: TimeTrackerState, action: PayloadAction<Record[]>) => {
            return {...state, records: action.payload}
        },
        addRecord: (state: TimeTrackerState, action: PayloadAction<Record>) => {
            return {...state, records: [...state.records, action.payload]}
        },
        editRecord: (state: TimeTrackerState, action: PayloadAction<Record>) => {
            return {...state, records: state.records.map(record => record.id === action.payload.id ? action.payload : record)}
        },
        removeRecord: (state: TimeTrackerState, action: PayloadAction<number>) => {
            return {...state, records: state.records.filter(record => record.id !== action.payload)}
        }
    }
})



export const fetchAllRecords = createAction("FetchAllRecords")
export const fetchAllUserRecords = createAction<number>("FetchAllUserRecords")
export const createRecord = createAction<Record>("CreateRecord")
export const deleteRecord = createAction<number>("DeleteRecord")
export const updateRecord = createAction<Record>("UpdateRecord")

export const {setRecords, addRecord, editRecord, removeRecord} = timeTrackerSlice.actions;
export const timeTrackerReducer = timeTrackerSlice.reducer;

export const recordToTimeTrackerListItem = (record: Record): TimeTrackerItem => {
    return {
        id: record.id,
        date: record.createdAt,
        begin: record.createdAt.getTime(),
        duration: record.workingTime,
        end: record.createdAt.getTime() + record.workingTime,
        isAutomaticallyCreated: record.isAutomaticallyCreated,
        editor: store.getState().rootReducer.userList.userList.find(user => user.id === record.editorId)
    }
}