import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { access } from "fs";
import { Cookies } from "react-cookie";
import { tokenToString } from "typescript";
import { Token } from "../../../type/Token";
import { AuthUserResponse, EmptyAuthUser } from "../../../type/User/AuthUser";
import { EmptyUser, User } from "../../../type/User/User";
import { clearCookie, refreshTokenKey, setCookie } from "../../Cookie/Cookie";



interface authState {
    authUser: AuthUserResponse | null,
    user: User | null,
    token: Token | null
}

const initialState: authState = {
    authUser: null,
    user: null,
    token: null
}
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /*на этом этапе ничего не продумано */
        setUser: (state, action:PayloadAction<User>)=>{
            return{...state, user: action.payload}
        },
        setUserDataFromToken: (state, action: PayloadAction<any>) => {
        
            return { ...state, };
        },
        /*вообше наверное для access токена так как рефреш запишем в куки */
        setToken: (state, action: PayloadAction<any>) => {
            console.log(action.payload)
            setCookie({key: refreshTokenKey,value: action.payload.refreshToken,daysLife: 7});
            return { ...state, token: action.payload };

        },
        logOut: (state) => {
            
            clearCookie(refreshTokenKey);
            return{...state, token: null, user:null}
        }
    }
});

export const {logOut, setToken,setUser } = authSlice.actions;

