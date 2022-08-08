import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AuthUserResponse } from "../../../type/User/AuthUser";
import { User } from "../../../type/User/User";
import {useAuth} from "../../../hooks/useAuth";
import {AuthLoginInputType, AuthRefreshInputType} from "../../../graphqlQuery/auth/authQuery";

type AuthStateType = {
    authUser: AuthUserResponse | null,
    user: User | null,
    accessToken: string | null,
    error?: string | null
}

const initialState: AuthStateType = {
    authUser: null,
    user: null,
    accessToken: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthStateType, action: PayloadAction<User>) => {
            return {...state, user: action.payload}
        },
        logout: (state: AuthStateType) => {
            return {...state, accessToken: null, user: null}
        },
        setError: (state: AuthStateType, action: PayloadAction<string>) => {
            return {...state, error: action.payload}
        }
    }
});

export const authorizeUserById = createAction<number>("AuthorizeUserById")
export const authLoginAction = createAction<AuthLoginInputType>("AuthLogin");
export const authRefreshAction = createAction<AuthRefreshInputType>("AuthRefresh");
export const authLogoutAction = createAction<number>("AuthLogout");

export const {logout, setUser, setError} = authSlice.actions;

