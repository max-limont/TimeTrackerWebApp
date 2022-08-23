import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetUserByIdQueryInputType, User} from "../../types/user.types";

type UserSliceStateType = {
    users: User[],
    user: User
}

const initialState: UserSliceStateType = {
    users: [],
    user: {} as User
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            return {...state, users: action.payload}
        },
        setUser: (state, action: PayloadAction<User>) => {
            return {...state, user: action.payload}
        }
    }
})

export const fetchAllUsers = createAction("FetchAllUsers")
export const getUserById = createAction<number>("GetUserById")



export const {setUser} = userSlice.actions
export const userReducer = userSlice.reducer
