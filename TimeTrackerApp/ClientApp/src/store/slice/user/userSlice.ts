import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../../type/User/User";

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
export const getUserById = createAction<number>("GetUserById")

export const {} = userSlice.actions
export const userReducer = userSlice.reducer