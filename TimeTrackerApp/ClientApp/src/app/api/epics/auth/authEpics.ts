import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, Observable, of} from "rxjs";
import { graphqlRequest } from "../../api";
import {
    authLoginAction,
    AuthLoginActionType, authLogoutAction,
    AuthLogoutActionType
} from "../../../../store/actions/auth/authActions";
import {
    AuthLoginInputType,
    authLoginQuery,
    AuthLogoutInputType,
    authLogoutQuery,
} from "../../../../graphqlQuery/auth/authQuery";
import {logout, setToken, setError} from "../../../../store/slice/authentication/authSlice";
import {parseJwt} from "../../../../store/parserJWT/parserJWT";
import {accessTokenKey, clearCookie, getCookie, refreshTokenKey, setCookie} from "../../../../Cookie/Cookie";
import {AuthUserResponse} from "../../../../type/User/AuthUser";
import {store} from "../../../store";
import {parseError} from "../../../parseError";
import {Action} from "react-epics";

const authLoginEpic: Epic = (action$: Observable<ReturnType<typeof authLoginAction>>): any => {
    return action$.pipe(
        ofType(AuthLoginActionType),
        mergeMap(action => from(graphqlRequest(authLoginQuery, {
            email: action.payload.email,
            password: action.payload.password
        } as AuthLoginInputType)).pipe(
            map(response => {
                if (response.data.authLogin && response.data.authLogin.accessToken && response.data.authLogin.refreshToken && !response.errors) {
                    setCookie({key: refreshTokenKey, value: response.data.authLogin.refreshToken, lifetime: 30 * 24 * 60 * 60});
                    setCookie({key: accessTokenKey, value: response.data.authLogin.accessToken, lifetime: 2 * 60});
                    location.replace('/');
                    return { payload: response, type: "AuthLoginSuccess" } as Action;
                } else if (response.errors) {
                    store.dispatch(setError(parseError(response.errors[0].message)));
                    return { payload: response, type: "AuthLoginError" } as Action
                }
                store.dispatch(logout());
                return { payload: response, type: "AuthLoginError" } as Action
            })
        ))
    )
}

const authLogoutEpic: Epic = (action$: Observable<ReturnType<typeof authLogoutAction>>): any => {
    return action$.pipe(
        ofType(AuthLogoutActionType),
        mergeMap(action => from(graphqlRequest(authLogoutQuery, {
            userId: action.payload
        } as AuthLogoutInputType)).pipe(
            map(() => {
                clearCookie(refreshTokenKey)
                clearCookie(accessTokenKey)
                store.dispatch(logout())
                return { payload: "Success", type: "AuthLogoutSuccess" } as Action
            }),
            map(() => location.replace("/welcome")),
        ))
    )
}

export const authEpics = combineEpics(authLogoutEpic, authLoginEpic);