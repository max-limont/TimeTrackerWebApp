import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetUserByIdQueryInputType, User} from "../../types/user.types";

type UserSliceStateType = {
    user: User | null
}

const initialState: UserSliceStateType = {
    user: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            return {...state, user: action.payload}
        }
    }
})

export const getUserById = createAction<GetUserByIdQueryInputType>("GetUserById")

export const {setUser} = userSlice.actions