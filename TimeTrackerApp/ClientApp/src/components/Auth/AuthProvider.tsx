import React, {FC, useEffect, useState} from "react";
import {AuthorizationUser, AuthUserResponse} from "../../types/auth.types";
import {authLoginAction, authLogoutAction, authorizeUserById, setUser} from "../../store/auth/auth.slice";
import {User} from "../../types/user.types";
import {useLocation, useNavigate} from "react-router-dom";
import {getCookie, refreshTokenKey} from "../../helpers/cookies";
import {parseJwt} from "../../helpers/parseJwt";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";

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
    const authUser = useAppSelector(state => state.rootReducer.auth.user)
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (authUser) {
            if (location.pathname === '/login')
                navigate('/', {replace: true})
            setState({...state, user: authUser})
            setUser(authUser);
        } else {
            const refreshToken = getCookie(refreshTokenKey)
            if (refreshToken) {
                dispatch(authorizeUserById(parseInt(parseJwt<AuthUserResponse>(refreshToken).UserId)))
            }
        }
    }, [authUser])

    const signIn = (credentials: AuthorizationUser, callback: any) => {
        dispatch(authLoginAction(credentials))
        callback()    }

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