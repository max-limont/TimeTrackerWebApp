import { createSlice } from "@reduxjs/toolkit";

interface userState {
    currentUser: "",/*тип юзера*/
}

const initialState: userState = {
    currentUser: ""
}
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        login: (state) => {
            return { ...state }
        }
    }
})

export default userSlice;
export const { login } = userSlice.actions;