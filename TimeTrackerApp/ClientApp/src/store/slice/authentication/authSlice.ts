import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "../../../type/Token";
import { AuthUserResponse, EmptyAuthUser } from "../../../type/User/AuthUser";
import {  User } from "../../../type/User/User";
import { clearCookie, refreshTokenKey, setCookie } from "../../../Cookie/Cookie";



interface authState {
    authUser: AuthUserResponse | null,
    user: User | null,
    accessToken: string | null,
    isLoading: boolean,
};

const initialState: authState = {
    authUser: null,
    user: null,
    isLoading: false,
    accessToken: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /*на этом этапе ничего не продумано */
        setUser: (state:authState, action:PayloadAction<User>)=>{
            return{...state, user: action.payload}
        },
        /*вообше наверное для access токена так как рефреш запишем в куки */
        setToken: (state:authState, action: PayloadAction<Token>) => {
            console.log(action.payload);
            setCookie({key: refreshTokenKey,value: action.payload.refreshToken,daysLife: 7});
            return { ...state, accessToken: action.payload.accessToken };
        },
        logOut: (state:authState) => {
            clearCookie(refreshTokenKey);
            return{...state, accessToken: null, user:null}
        },
        setLoadingState:  (state:authState, action: PayloadAction<boolean>) => {
            return{...state, isLoading: action.payload}
        }
    }
});

export const {logOut, setToken,setUser,setLoadingState } = authSlice.actions;

