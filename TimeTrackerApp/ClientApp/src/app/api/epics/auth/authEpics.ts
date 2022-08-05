import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, of} from "rxjs";
import { graphqlRequest } from "../../api";
import {
    AuthLoginActionType,
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
import {clearCookie, getCookie, refreshTokenKey, setCookie} from "../../../../Cookie/Cookie";
import {AuthUserResponse} from "../../../../type/User/AuthUser";
import {store} from "../../../store";
import {parseError} from "../../../parseError";

const authLoginEpic = (action$: any) => {
    return action$.pipe(
        ofType(AuthLoginActionType),
        mergeMap((action: any) => from(graphqlRequest(authLoginQuery, {
            email: action.payload.email,
            password: action.payload.password
        } as AuthLoginInputType)).pipe(
            map(response => {
                if (response.data.authLogin && response.data.authLogin.accessToken && response.data.authLogin.refreshToken && !response.errors) {
                    setCookie({key: refreshTokenKey, value: response.data.authLogin.refreshToken, daysLife: 7});
                    return store.dispatch(setToken(response.data.authLogin.accessToken));
                } else if (response.errors) {
                    return store.dispatch(setError(parseError(response.errors[0].message)));
                }
                return store.dispatch(logout());
            })
        ))
    )
}

const authLogoutEpic = (action$: any) => {
    return action$.pipe(
        ofType(AuthLogoutActionType),
        mergeMap((action: any) => from(graphqlRequest(authLogoutQuery, {
            userId: parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId)
        } as AuthLogoutInputType)).pipe(
            map(() => {
                clearCookie(refreshTokenKey)
                return store.dispatch(logout())
            }),
            map(() => location.replace("/welcome")),
        ))
    )
}

export const authEpics = combineEpics(authLogoutEpic, authLoginEpic);