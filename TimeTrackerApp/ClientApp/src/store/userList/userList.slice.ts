import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ExportDataItemType, User} from "../../types/user.types";
import {UserListPage} from "../../types/userList.types";

type UserListStateType = {
    userList: User[],
    createdUser: User | null,
    deletedUser: User | null
    editedUser: User | null,
    exportUsers: ExportDataItemType[],
    count: number,
    error: null | string
}

const initialState: UserListStateType = {
    exportUsers: [],
    createdUser: null,
    deletedUser: null,
    editedUser: null,
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
        setExportData: (state, action: PayloadAction<ExportDataItemType[]>) => {
            return {...state, error: null, exportUsers: action.payload}
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
        editUser: (state, action: PayloadAction<User>) => {
            return {
                ...state,
                error: null,
                editedUser: action.payload,
                userList: state.userList.map(item => item.id === action.payload.id ? action.payload : item)
            }
        },
        userListError: (state, action: PayloadAction<string>) => {
            return {...state, count: 0, error: action.payload, userList: []}
        }
    }
})

export const {
    setUserListCount,
    setUserList,
    setExportData,
    userListError,
    insertCreatedUser,
    deleteUser,
    editUser
} = userListSlice.actions

export const fetchUserListPage = createAction<UserListPage>("fetchUserListPage");
export const fetchExportData = createAction<UserListPage>("fetchExportData");
export const createUserAction = createAction<User>("createUser");
export const editUserAction = createAction<User>("editUser");
export const deleteUserAction = createAction<number>("deleteUser");
export const fetchUserCount = createAction("fetchUserCount");
export const fetchUserListSearchRequest = createAction<{ request: string }>("fetchUserListSearchRequest");