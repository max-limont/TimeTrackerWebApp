import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    CreateSickLeaveMutationInputType,
    FetchAllSickLeavesByEmployeeIdQueryInputType,
    FetchAllSickLeavesForManagerByManagerIdQueryInputType,
    GetSickLeaveByIdInputType,
    RemoveSickLeaveMutationInputType,
    SickLeave,
    UpdateSickLeaveMutationInputType
} from "../../types/sickLeave.types";
import {parseObjectToUser} from "../user/user.slice";

export type SickLeaveStateType = {
    sickLeaves: SickLeave[]
}

const initialState: SickLeaveStateType = {
    sickLeaves: []
}

export const sickLeaveSlice = createSlice({
    name: 'sickLeaveSlice',
    initialState,
    reducers: {
        setSickLeaves: (state, action: PayloadAction<SickLeave[]>) => {
            return {...state, sickLeaves: action.payload}
        },
        addSickLeave: (state, action: PayloadAction<SickLeave>) => {
            return {...state, sickLeaves: [action.payload, ...state.sickLeaves]}
        },
        editSickLeave: (state, action: PayloadAction<SickLeave>) => {
            return {...state, sickLeaves: state.sickLeaves.map(sickLeave => sickLeave.id === action.payload.id ? action.payload : sickLeave)}
        },
        deleteSickLeave: (state, action: PayloadAction<number>) => {
            return {...state, sickLeaves: state.sickLeaves.filter(sickLeave => sickLeave.id !== action.payload)}
        }
    }
})

export const fetchAllSickLeaves = createAction("FetchAllSickLeaves")
export const fetchAllSickLeavesByEmployeeId = createAction<FetchAllSickLeavesByEmployeeIdQueryInputType>("FetchAllSickLeavesByEmployeeId")
export const fetchAllSickLeavesForManagerByManagerId = createAction<FetchAllSickLeavesForManagerByManagerIdQueryInputType>("FetchAllSickLeavesForManagerByManagerId")
export const getSickLeaveById = createAction<GetSickLeaveByIdInputType>("GetSickLeaveById")
export const createSickLeave = createAction<CreateSickLeaveMutationInputType>("CreateSickLeave")
export const updateSickLeave = createAction<UpdateSickLeaveMutationInputType>("UpdateSickLeave")
export const removeSickLeave = createAction<RemoveSickLeaveMutationInputType>("RemoveSickLeave")

export const {setSickLeaves, addSickLeave, editSickLeave, deleteSickLeave} = sickLeaveSlice.actions
export const sickLeaveReducer = sickLeaveSlice.reducer

export const parseObjectToSickLeave = (object: any): SickLeave => {
    return {
        id: parseInt(object.id),
        startDate: new Date(object.startDate),
        endDate: new Date(object.endDate),
        employeeId: parseInt(object.employeeId),
        approverId: object.approverId ? parseInt(object.approverId) : null,
        status: parseInt(object.status),
        creationDateTime: new Date(new Date(object.creationDateTime) + "UTC"),
        approver: object.approver ? parseObjectToUser(object.approver) : null
    } as SickLeave
}