import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../type/Models/User";

interface UserListState{
    userList: User[],
    count: number
    error: null | string
}

const initialState: UserListState = {
    userList: [],
    count: 0,
    error: null
}
const userListSlice = createSlice({
    name: "userListSlice",
    initialState,
    reducers: {
        set_user_list_count:(state, action:PayloadAction<number>) => {
          return {...state, count: action.payload, error: null}
        },
        set_user_list: (state, action:PayloadAction<User[]>) => {
            return {...state, error:null, userList: action.payload}
        },
        user_list_error: (state, action:PayloadAction<string>) => {
            return {...state, loading: false, error: action.payload, userList: []}
        }
    }
})

export default userListSlice;
export const {set_user_list_count, set_user_list, user_list_error} = userListSlice.actions