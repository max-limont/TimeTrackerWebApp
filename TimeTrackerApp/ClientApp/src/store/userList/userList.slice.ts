import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../types/user.types";
import {UserListPage} from "../../types/userList.types";

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

export const userListSlice = createSlice({
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

export const {setUserListCount, setUserList, userListError} = userListSlice.actions

export const fetchUserListPage = createAction<UserListPage>("fetchUserListPage");
export const fetchUserCount = createAction("fetchUserCount");
export const fetchUserListSearchRequest = createAction<{request: string}>("fetchUserListSearchRequest");