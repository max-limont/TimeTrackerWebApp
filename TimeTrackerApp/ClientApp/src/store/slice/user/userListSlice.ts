import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../type/Models/User";

interface UserListState{
    userList: User[],
    loading: boolean,
    error: null | string
}

const initialState: UserListState = {
    userList: [],
    loading: false,
    error: null
}
const userListSlice = createSlice({
    name: "userListSlice",
    initialState,
    reducers: {
        fetch_userList:(state) => {
          return {...state, loading: true, error: null, userList: []}
        },
        fetch_userList_success: (state, action:PayloadAction<User[]>) => {
            return {...state, loading: false, error:null, userList: action.payload}
        },
        fetch_userList_error: (state, action:PayloadAction<string>) => {
            return {...state, loading: false, error: action.payload, userList: []}
        }
    }
})

export default userListSlice;
export const {fetch_userList, fetch_userList_success, fetch_userList_error} = userListSlice.actions