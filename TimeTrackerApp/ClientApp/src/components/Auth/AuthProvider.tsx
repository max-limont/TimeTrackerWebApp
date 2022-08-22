import React, {FC, useEffect, useState} from "react";
import {AuthorizationUser, AuthUserResponse} from "../../types/auth.types";
import {authLoginAction, authLogoutAction, authorizeUserById, setUser} from "../../store/auth/auth.slice";
import {User} from "../../types/user.types";
import {useLocation, useNavigate} from "react-router-dom";
import {accessTokenKey, getCookie, refreshTokenKey} from "../../helpers/cookies";
import {parseJwt} from "../../helpers/parseJwt";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";

const defaultSignIn = (credentials: AuthorizationUser, callback: any) => {}
const defaultSignOut = (callback: any) => {}

export type AuthStateType = {
    user?: User | null
    isUserAuthenticated: boolean
    accessToken?: string | null
    refreshToken?: string | null
}

export type AuthProviderStateType = {
    state?: AuthStateType,
    signIn: (credentials: AuthorizationUser, callback: any) => any,
    signOut: (callback: any) => any
}

const initialAuthState: AuthStateType = {
    user: null,
    isUserAuthenticated: false,
    accessToken: undefined,
    refreshToken: undefined
}

const initialAuthContextState: AuthProviderStateType = {
    state: undefined,
    signIn: defaultSignIn,
    signOut: defaultSignOut
}

export const authContext = React.createContext(initialAuthContextState);

export const AuthProvider: FC<any> = ({ children }) => {

    const [state, setState] = useState(initialAuthState)
    const authUser = useAppSelector(state => state.rootReducer.auth.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = getCookie(accessTokenKey)
    const refreshToken = getCookie(refreshTokenKey)

    useEffect(() => {

        if (accessToken) {
            setState({...state, accessToken: accessToken, refreshToken: refreshToken})
        }

        if (authUser) {
            setState({...state, user: authUser, isUserAuthenticated: true})
            if (location.pathname === '/login')
                navigate('/', {replace: true})
        }

        if (refreshToken) {
            if (!authUser) {
                dispatch(authorizeUserById(parseInt(parseJwt<AuthUserResponse>(refreshToken).UserId)))
            }
        } else {
            dispatch(authLogoutAction(getCookie(refreshTokenKey) ? parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId) : 0))
            if (location.pathname !== '/login')
                navigate('/login', {replace: true})
        }

    }, [authUser, accessToken, refreshToken])

    const signIn = (credentials: AuthorizationUser, callback: any) => {
        dispatch(authLoginAction(credentials))
        callback()
    }

    const signOut = (callback: any) => {
        dispatch(authLogoutAction(state.user!.id))
        callback()
    }

    const auth = {state, signIn, signOut}

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    )
}