import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, startWith,Observable, endWith} from "rxjs";
import { graphqlRequest } from "../../api";
import {
    AuthLoginInputType,
    authLoginQuery,
    AuthLogoutInputType,
    authLogoutQuery,
} from "../../../../graphqlQuery/auth/authQuery";
import {
    authLoginAction, authLogoutAction,
    authorizeUserById,
    logout,
    setError,
    setLoadingState,
    setUser
} from "../../../../store/slice/authentication/authSlice";
import {accessTokenKey, clearCookie, getCookie, refreshTokenKey, setCookie} from "../../../../Cookie/Cookie";
import {store} from "../../../store";
import {parseError} from "../../../parseError";
import {Action} from "react-epics";
import {getUserByIdQuery, GetUserByIdQueryInputType} from "../../../../graphqlQuery/user/userQuery";
import {User} from "../../../../type/User/User";
import {parseJwt} from "../../../../store/parserJWT/parserJWT";
import {AuthUserResponse} from "../../../../type/User/AuthUser";

const authLoginEpic: Epic = (action$: Observable<ReturnType<typeof authLoginAction>>): any => {
    return action$.pipe(
        ofType("AuthLogin"),
        mergeMap(action => from(graphqlRequest(authLoginQuery, {
            email: action.payload.email,
            password: action.payload.password
        } as AuthLoginInputType)).pipe(
            map(response => {
                if (response && response.data.authLogin && response.data.authLogin.accessToken && response.data.authLogin.refreshToken && !response.errors) {
                    setCookie({key: refreshTokenKey, value: response.data.authLogin.refreshToken, lifetime: 30 * 24 * 60 * 60});
                    setCookie({key: accessTokenKey, value: response.data.authLogin.accessToken, lifetime: 2 * 60});
                    const userId = parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId);
                    store.dispatch(authorizeUserById(userId))
                    return { payload: response, type: "AuthLoginSuccess" } as Action;
                } else if (response && response.errors) {
                    store.dispatch(setError(parseError(response.errors[0].message)));
                    return { payload: response, type: "AuthLoginError" } as Action
                }
              
                store.dispatch(logout());
                return { payload: response, type: "AuthLoginError" } as Action
            })
        )),
    )
}

const authLogoutEpic: Epic = (action$: Observable<ReturnType<typeof authLogoutAction>>): any => {
    return action$.pipe(
        ofType("AuthLogout"),
        mergeMap(action => from(graphqlRequest(authLogoutQuery, {
            userId: action.payload
        } as AuthLogoutInputType)).pipe(
            map(() => {
                clearCookie(refreshTokenKey)
                clearCookie(accessTokenKey)
                store.dispatch(logout())
                return { payload: "Success", type: "AuthLogoutSuccess" } as Action
            }),
        ))
    )
}

const authSetUserEpic: Epic = (action$: Observable<ReturnType<typeof authorizeUserById>>): any => {
    return action$.pipe(
        ofType("AuthorizeUserById"),
        mergeMap(action => from(graphqlRequest(getUserByIdQuery, {
            id: action.payload
        } as GetUserByIdQueryInputType)).pipe(
            map(response => {
                if (response && response.data && response.data.getUserById) {
                    const apiResponse = response.data.getUserById
                    const user = {
                        id: parseInt(apiResponse.id),
                        email: apiResponse.email ?? "",
                        firstName: apiResponse.firstName ?? "Unknown",
                        lastName: apiResponse.lastName ?? "User",
                        weeklyWorkingTime: parseInt(apiResponse.weeklyWorkingTime ?? ''),
                        remainingVacationDays: parseInt(apiResponse.remainingVacationDays ?? ''),
                        privilegesValue: parseInt(apiResponse.privilegesValue ?? ''),
                        vacationPermissionId: parseInt(apiResponse.vacationPermissionId??"")
                    } as User
                    store.dispatch(setUser(user))
                    return { payload: "Success", type: "AuthSetUserSuccess" } as Action
                }
                return { payload: "Error", type: "AuthSetUserError"} as Action
            })
        ))
    )
}

export const authEpics = combineEpics(authLogoutEpic, authLoginEpic, authSetUserEpic);