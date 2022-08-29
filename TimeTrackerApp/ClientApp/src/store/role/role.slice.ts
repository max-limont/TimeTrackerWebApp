import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "rxjs/internal/scheduler/Action";
import { RoleType } from "../../types/role.types";
import { state } from "../store";

interface roleState {
    roles: RoleType[]
}

const initialState:roleState = {
    roles: []
}

export const roleSlice = createSlice({
    name: "role",
    initialState: initialState,
    reducers:{
        setRoles: (state,action:PayloadAction<RoleType[]>) =>{
            return {...state, roles: action.payload };
        }
    }
});


export const {setRoles } = roleSlice.actions
export const getRolesAction = createAction("fetchRoles");