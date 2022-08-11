import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../../../type/Models/User";

type UserListStateType = {
    userList: User[],
    count: number
    error: null | string
}

const initialState: UserListStateType = {
    userList: [],
    count: 0,
    error: null
}

const userListSlice = createSlice({
    name: "userListSlice",
    initialState,
    reducers: {
        setUserListCount:(state, action:PayloadAction<number>) => {
          return {...state, count: action.payload, error: null}
        },
        setUserList: (state, action:PayloadAction<User[]>) => {
            return {...state, error:null, userList: action.payload}
        },
        userListError: (state, action:PayloadAction<string>) => {
            return {...state, count: 0, error: action.payload, userList: []}
        }
    }
})

export default userListSlice;
export const {setUserListCount, setUserList, userListError} = userListSlice.actions
