import {accessTokenKey, getCookie, refreshTokenKey, setCookie} from "../helpers/cookies";
import { parseJwt } from "../helpers/parseJwt";
import { authRefreshQuery } from "./queries/auth.queries";
import {AuthRefreshInputType, AuthUserResponse} from "../types/auth.types";
import {store} from "../store/store";
import {authLogoutAction} from "../store/auth/auth.slice";

const apiUrl = "http://localhost:5000/graphql";

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
    const accessTokenInCookies = getCookie(accessTokenKey) ?? '';
    let response = await request(query, variables);

    if (response.ok) {
        return await response.json()
    }

    if (refreshTokenInCookies) {
        const authenticatedUserId = parseInt(parseJwt<AuthUserResponse>(refreshTokenInCookies).UserId)
        const authRefreshQueryVariables: AuthRefreshInputType = {
            userId: authenticatedUserId,
            accessToken: accessTokenInCookies,
            refreshToken: refreshTokenInCookies,
        }
        const refreshResponse = await request(authRefreshQuery, authRefreshQueryVariables);
        if (refreshResponse.ok) {
            const refreshResponseBody = await refreshResponse.json();
            if (refreshResponseBody?.data?.authRefresh) {
                setCookie({key: refreshTokenKey, value: refreshResponseBody.data.authRefresh.refreshToken, lifetime: 30 * 24 * 60 * 60})
                setCookie({key: accessTokenKey, value: refreshResponseBody.data.authRefresh.accessToken, lifetime: 2 * 60})
                response = await request(query, variables)
                return response.ok ? await response.json() : response.status;
            }
        }
        store.dispatch(authLogoutAction(authenticatedUserId))
    }
    location.replace('/login')
}