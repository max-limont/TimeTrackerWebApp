import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "../../../type/Token";
import { AuthUser, EmptyAuthUser } from "../../../type/User/AuthUser";
import { EmptyUser, User } from "../../../type/User/User";



interface authState {
    authUser: AuthUser|null,
    user: User|null,
    token: Token|null
}

const initialState: authState = {
    authUser: null,
    user: null,
    token:  null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials:(state,action:PayloadAction<any>)=>{
            const {user, accessToken} = action.payload;
            const newToken = {...state.token, accessToken: accessToken, refreshToken: ""}
            
            return{...state, authUser: user, token: newToken};
        },
        logOut : (state)=>{
            state.user= null;
            state.token = null
        }
    }
});

export const {setCredentials, logOut} = authSlice.actions;


