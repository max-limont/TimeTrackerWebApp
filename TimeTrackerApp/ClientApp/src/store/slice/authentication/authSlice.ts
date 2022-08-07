import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AuthUserResponse } from "../../../type/User/AuthUser";
import { User } from "../../../type/User/User";
import {store} from "../../../app/store";
import {parseJwt} from "../../parserJWT/parserJWT";
import {getCookie, refreshTokenKey} from "../../../Cookie/Cookie";

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

export const {logout, setUser, setError} = authSlice.actions;

export const getAuthorizedUser = (): User | null => {
    let user = JSON.parse(window.localStorage.getItem("AuthorizedUser") ?? '')

    if (user === '') {
        store.dispatch(authorizeUserById(parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId)))
        user = JSON.parse(window.localStorage.getItem("AuthorizedUser") ?? '')
    }

    return user !== '' ? {
        id: parseInt(user.id),
        email: user.email ?? "",
        firstName: user.firstName ?? "Unknown",
        lastName: user.lastName ?? "User",
        weeklyWorkingTime: parseInt(user.weeklyWorkingTime ?? ''),
        remainingVacationDays: parseInt(user.remainingVacationDays ?? ''),
        privilegesValue: parseInt(user.privilegesValue ?? '')
    } as User : null
}

