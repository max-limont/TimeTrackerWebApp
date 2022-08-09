import React, {FC, useEffect, useState} from "react";
import {AuthorizationUser, AuthUserResponse} from "../../type/User/AuthUser";
import {useAppSelector} from "../../app/hooks";
import {store} from "../../app/store";
import {authLoginAction, authLogoutAction, authorizeUserById} from "../../store/slice/authentication/authSlice";
import {User} from "../../type/User/User";
import {useLocation, useNavigate} from "react-router-dom";
import {accessTokenKey, getCookie, refreshTokenKey} from "../../Cookie/Cookie";
import {parseJwt} from "../../store/parserJWT/parserJWT";

const defaultSignIn = (credentials: AuthorizationUser, callback: any) => {}
const defaultSignOut = (callback: any) => {}

export type AuthStateType = {
    user?: User | null
}

export type AuthProviderStateType = {
    state?: AuthStateType,
    signIn: (credentials: AuthorizationUser, callback: any) => any,
    signOut: (callback: any) => any
}

const initialAuthState: AuthStateType = {
    user: null
}

const initialAuthContextState: AuthProviderStateType = {
    state: undefined,
    signIn: defaultSignIn,
    signOut: defaultSignOut
}

export const authContext = React.createContext(initialAuthContextState);

export const AuthProvider: FC<any> = ({ children }) => {

    const [state, setState] = useState(initialAuthState)
    const navigate = useNavigate()
    const authUser = useAppSelector(state => state.rootReducer.auth.user)
    const location = useLocation()

    useEffect(() => {
        if (authUser) {
            if (location.pathname === '/login')
                navigate('/', {replace: true})
            setState({...state, user: authUser})
        } else {
            const refreshToken = getCookie(refreshTokenKey)
            if (refreshToken) {
                store.dispatch(authorizeUserById(parseInt(parseJwt<AuthUserResponse>(refreshToken).UserId)))
            }
        }
    }, [authUser])

    const signIn = (credentials: AuthorizationUser, callback: any) => {
        store.dispatch(authLoginAction(credentials))
        callback()
    }

    const signOut = (callback: any) => {
        store.dispatch(authLogoutAction(state.user!.id))
        callback()
    }

    const auth = {state, signIn, signOut}

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}