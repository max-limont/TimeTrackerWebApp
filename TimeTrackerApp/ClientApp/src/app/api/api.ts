import { getCookie, refreshTokenKey } from "../../Cookie/Cookie";
import { parseJwt } from "../../store/parserJWT/parserJWT";
import { logOut, setToken } from "../../store/slice/authentication/authSlice";
import { refreshTokenUpdate } from "../../graphqlQuery/auth/authQuery";
import { AuthUserResponse } from "../../type/User/AuthUser";
import { useAppDispatch, useAppSelector } from "../hooks";
import { dispatchOut, state, store } from "../store";

const apiUrl = "https://localhost:44322/graphql";
/* accesss токен получаем возвращаем строку для хедера*/
function useGetTokenState() {
    const accessToken = state.rootReducer.auth.accessToken;
    return accessToken == undefined ||accessToken == null ? "" : "Bearer " + accessToken;
}


/*в основном для для аторизаци*/
export const Request = async (query: string, variables?: unknown) => {
    const request = await fetch(
        apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: useGetTokenState()
        },
        body: JSON.stringify({ query, variables })
    });

    return await request.json();
}

/* основной который выполянет запросы и запросит access токен если уже вышел срок*/
export const usebaseQueryWithReauth = async (query: string, variables: any) => {
    const result = await Request(query, variables);
    /*тут наверное нужно проверить ошибку на access token*/
    if (result.errors != undefined) {
        /*сделать запрос на обновления access токена с помощь рефреша*/
        console.log("sending refresh token");
        const refreshToken = getCookie(refreshTokenKey);
        
        if (refreshToken != null) {
            const refreshResult = await defaultRequest(refreshTokenUpdate, { id: parseJwt<AuthUserResponse>(refreshToken).UserId, refresh: refreshTokenKey });
            if (refreshResult.data != undefined) {
                dispatchOut(setToken(refreshResult));
                return await  Request(query, variables);
            }
            else {
                dispatchOut(logOut());
            }
        }
        else {
            dispatchOut(logOut());
        }
    }

    if (result.data != undefined) {
        return result;
    }

}


/*для запроса нетребующих авторизации*/
export const defaultRequest = async (query: string, variables?: unknown) => {
    const request = await fetch(
        apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables })
    });
    return await request.json();
}