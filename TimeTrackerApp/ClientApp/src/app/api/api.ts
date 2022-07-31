import { access } from "fs";
import { Cookies } from "react-cookie";
import { getCookie, refreshTokenKey } from "../../store/Cookie/Cookie";
import { parseJwt } from "../../store/parserJWT/parserJWT";
import { logOut, setToken } from "../../store/slice/authentication/authSlice";
import { refreshTokenUpdate } from "../../store/slice/epics/graphqlQuery/auth/authQuery";
import { AuthUserResponse } from "../../type/User/AuthUser";
import { useAppDispatch, useAppSelector } from "../hooks";

const apiUrl = "https://localhost:5001/graphql";

function GetTokenState() {
    const accessToken = useAppSelector(s => s.rootReducer.auth.token?.accessToken);

    return accessToken == undefined ? "" : "Bearer " + accessToken;
}
/*в основном для для аторизаци*/
export const Request = async (query: string, variables?: unknown) => {
    const request = await fetch(
        apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: GetTokenState()
        },
        body: JSON.stringify({ query, variables })
    });

    return await request.json();
}

/* основной который выполянет запросы и запросит access токен если уже вышел срок*/
export const baseQueryWithReauth = async (query: string, variables?: unknown) => {
    const result = await Request(query, variables);

    const dispatch = useAppDispatch();
    /*тут наверное нужно проверить ошибку на access token*/
    if (result == false) {
        /*сделать запрос на обновления access токена с помощь рефреша*/
        console.log("sending refresh token");
        const refreshToken = getCookie(refreshTokenKey);
        const refreshResult = await defaultRequest(refreshTokenUpdate, { id: parseJwt<AuthUserResponse>(refreshToken).UserId , refresh:refreshTokenKey});
        if (refreshResult.data != null) {

            dispatch(setToken(refreshResult));
        }
        else {
            dispatch(logOut());
        }
    }
   
    if (result == true) {
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