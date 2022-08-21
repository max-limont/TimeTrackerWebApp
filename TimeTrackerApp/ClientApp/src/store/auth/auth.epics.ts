import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import { graphqlRequest } from "../../graphql/api";
import {
    authLoginQuery,
    authLogoutQuery,
} from "../../graphql/queries/auth.queries";
import {
    authLoginAction, authLogoutAction,
    authorizeUserById,
    setError,
    setUser
} from "./auth.slice";
import {accessTokenKey, clearCookie, getCookie, refreshTokenKey, setCookie} from "../../helpers/cookies";
import {store} from "../store";
import {parseError} from "../../helpers/parseError";
import {Action} from "react-epics";
import {getUserByIdQuery} from "../../graphql/queries/user.queries";
import {GetUserByIdQueryInputType, User} from "../../types/user.types";
import {parseJwt} from "../../helpers/parseJwt";
import {AuthLoginInputType, AuthLogoutInputType, AuthUserResponse} from "../../types/auth.types";

const authLoginEpic: Epic = (action$: Observable<ReturnType<typeof authLoginAction>>): any => {
    return action$.pipe(
        ofType(authLoginAction.type),
        mergeMap(action => from(graphqlRequest(authLoginQuery, {
            email: action.payload.email,
            password: action.payload.password
        } as AuthLoginInputType)).pipe(
            map(response => {
                if (response?.data?.authLogin?.accessToken && response?.data?.authLogin?.refreshToken && !response?.errors) {
                    setCookie({key: refreshTokenKey, value: response.data.authLogin.refreshToken, lifetime: 30 * 24 * 60 * 60});
                    setCookie({key: accessTokenKey, value: response.data.authLogin.accessToken, lifetime: 2 * 60});
                    const userId = parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId);
                    store.dispatch(authorizeUserById(userId))
                    return { payload: response, type: "AuthLoginSuccess" } as Action;
                } else if (response?.errors) {
                    store.dispatch(setError(parseError(response.errors[0].message)));
                    return { payload: response, type: "AuthLoginError" } as Action
                }
                return { payload: response, type: "AuthLoginError" } as Action
            })
        )),
    )
}

const authLogoutEpic: Epic = (action$: Observable<ReturnType<typeof authLogoutAction>>): any => {
    return action$.pipe(
        ofType(authLogoutAction.type),
        mergeMap(action => from(graphqlRequest(authLogoutQuery, {
            userId: action.payload
        } as AuthLogoutInputType)).pipe(
            map(() => {
                clearCookie(refreshTokenKey)
                clearCookie(accessTokenKey)
                return { payload: "Success", type: "AuthLogoutSuccess" } as Action
            }),
        ))
    )
}

const authSetUserEpic: Epic = (action$: Observable<ReturnType<typeof authorizeUserById>>): any => {
    return action$.pipe(
        ofType(authorizeUserById.type),
        mergeMap(action => from(graphqlRequest(getUserByIdQuery, {
            id: action.payload
        } as GetUserByIdQueryInputType)).pipe(
            map(response => {
                if (response?.data?.getUserById) {
                    const apiResponse = response.data.getUserById
                    const user = {
                        id: parseInt(apiResponse.id),
                        email: apiResponse.email ?? "",
                        firstName: apiResponse.firstName ?? "Unknown",
                        lastName: apiResponse.lastName ?? "User",
                        isFullTimeEmployee: Boolean(JSON.parse(apiResponse.isFullTimeEmployee)),
                        weeklyWorkingTime: parseInt(apiResponse.weeklyWorkingTime ?? ''),
                        remainingVacationDays: parseInt(apiResponse.remainingVacationDays ?? ''),
                        privilegesValue: parseInt(apiResponse.privilegesValue ?? ''),
                        vacationPermissionId: parseInt(apiResponse.vacationPermissionId??""),
                        teamId: parseInt(apiResponse.teamId),
                        roleId: parseInt(apiResponse.roleId)
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