import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../types/user.types";
import {UserListPage} from "../../types/userList.types";
import {filter} from "rxjs";

type UserListStateType = {
    userList: User[],
    createdUser: User | null,
    deletedUser: User | null
    count: number,
    error: null | string
}

const initialState: UserListStateType = {
    createdUser: null,
    deletedUser: null,
    userList: [],
    count: 0,
    error: null
}

export const userListSlice = createSlice({
    name: "userListSlice",
    initialState,
    reducers: {
        setUserListCount: (state, action: PayloadAction<number>) => {
            return {...state, count: action.payload, error: null}
        },
        setUserList: (state, action: PayloadAction<User[]>) => {
            return {...state, error: null, userList: action.payload}
        },
        insertCreatedUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                error: null,
                userList: [action.payload, ...state.userList],
                createdUser: action.payload
            }
        },
        deleteUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                error: null,
                userList: state.userList.filter(item => item != action.payload),
                deletedUser: action.payload
            }
        },
        userListError: (state, action: PayloadAction<string>) => {
            return {...state, count: 0, error: action.payload, userList: []}
        }
    }
})

export const {setUserListCount, setUserList, userListError, insertCreatedUser, deleteUser} = userListSlice.actions

export const fetchUserListPage = createAction<UserListPage>("fetchUserListPage");
export const createUserAction = createAction<User>("createUser");
export const deleteUserAction = createAction<number>("deleteUser");
export const fetchUserCount = createAction("fetchUserCount");
export const fetchUserListSearchRequest = createAction<{ request: string }>("fetchUserListSearchRequest");