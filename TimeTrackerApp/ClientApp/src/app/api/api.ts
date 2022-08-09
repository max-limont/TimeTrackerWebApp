import {accessTokenKey, clearCookie, getCookie, refreshTokenKey, setCookie} from "../../Cookie/Cookie";
import { parseJwt } from "../../store/parserJWT/parserJWT";
import { AuthRefreshInputType, authRefreshQuery } from "../../graphqlQuery/auth/authQuery";
import { AuthUserResponse } from "../../type/User/AuthUser";
import { store } from "../store";
import {authLogoutAction} from "../../store/slice/authentication/authSlice";

const apiUrl = "https://localhost:5001/graphql";

const getAuthorizationHeader = (): string => {
    const accessToken = getCookie(accessTokenKey);
    return accessToken ? `Bearer ${accessToken}` : "";
}

export const request = async (query: string, variables?: any) => {
    return await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getAuthorizationHeader()
        },
        body: JSON.stringify({ query, variables }),
    });
}

export const graphqlRequest = async (query: string, variables?: any) => {
    const refreshTokenInCookies = getCookie(refreshTokenKey);
    let response = await request(query, variables);

    if (response.ok) {
        return await response.json()
    }

    if (refreshTokenInCookies) {
        const authenticatedUserId = parseInt(parseJwt<AuthUserResponse>(refreshTokenInCookies).UserId)
        const authRefreshQueryVariables: AuthRefreshInputType = {
            userId: authenticatedUserId,
            refreshToken: refreshTokenInCookies,
        }
        const refreshResponse = await request(authRefreshQuery, authRefreshQueryVariables);
        if (refreshResponse.ok) {
            const refreshResponseBody = await refreshResponse.json();
            if (refreshResponseBody.data) {
                if (!refreshResponseBody.data.authRefresh) {
                    store.dispatch(authLogoutAction(authenticatedUserId))
                    return "Logout";
                }
                setCookie({key: refreshTokenKey, value: refreshResponseBody.data.authRefresh.refreshToken, lifetime: 30 * 24 * 60 * 60})
                setCookie({key: accessTokenKey, value: refreshResponseBody.data.authRefresh.accessToken, lifetime: 2 * 60})
                response = await request(query, variables)
                return response.ok ? await response.json() : response.status;
            }
        }
        console.log(2)
        store.dispatch(authLogoutAction(authenticatedUserId))
    }
}