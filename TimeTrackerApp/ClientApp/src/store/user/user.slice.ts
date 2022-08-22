import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetUserByIdQueryInputType, User} from "../../types/user.types";

type UserSliceStateType = {
    users: User[]
}

const initialState: UserSliceStateType = {
    users: []
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            return {...state, users: action.payload}
        }
    }
})

export const fetchAllUsers = createAction("FetchAllUsers")
export const getUserById = createAction<GetUserByIdQueryInputType>("GetUserById")

export const {} = userSlice.actions
export const userReducer = userSlice.reducer