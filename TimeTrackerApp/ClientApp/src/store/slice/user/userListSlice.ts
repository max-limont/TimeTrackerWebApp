import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User} from "../../../type/User/User";

type UserListStateType = {
    userList: User[],
    loading: boolean,
    error: null | string
}

const initialState: UserListStateType = {
    userList: [],
    loading: false,
    error: null
}

const userListSlice = createSlice({
    name: "userListSlice",
    initialState,
    reducers: {

    }
})

export default userListSlice;
export const {} = userListSlice.actions