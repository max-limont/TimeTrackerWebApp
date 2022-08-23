import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthLoginInputType, AuthRefreshInputType, AuthUserResponse} from "../../types/auth.types";
import { User } from "../../types/user.types"

type AuthStateType = {
    user: User | null,
    isLoading: boolean,
    error?: string | null
}


const initialState: AuthStateType = {
    user: null,
    isLoading: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<User>) => {
            localStorage.setItem("auth", JSON.stringify(action.payload))
            return {...state, user: action.payload}
        },
        logout: (state: AuthStateType) => {
            localStorage.removeItem("auth")
            return {...state, user: null}
        },
        setLoadingState:  (state, action: PayloadAction<boolean>) => {
            return{...state, isLoading: action.payload}
        },
        setError: (state: AuthStateType, action: PayloadAction<string>) => {
            return {...state, error: action.payload}
        },
    }
});

export const {logout, setError, setUser, setLoadingState} = authSlice.actions;
export const authorizeUserById = createAction<number>("AuthorizeUserById")
export const authLoginAction = createAction<AuthLoginInputType>("AuthLogin");
export const authRefreshAction = createAction<AuthRefreshInputType>("AuthRefresh");
export const authLogoutAction = createAction<number>("AuthLogout");


