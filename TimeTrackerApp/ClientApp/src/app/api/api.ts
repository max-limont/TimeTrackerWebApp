import { access } from "fs";
import { setCredentials } from "../../store/slice/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

const apiUrl = "https://localhost:5000/graphql";

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

/* основной который выполянет запросы
*/
export const graphqlRequest = async (query: string, variables?: unknown) => {
    const result = await Request(query, variables);
    /*тут наверное нужно проверить ошибку на access token*/
    if (result == false) {
        /*сделать запрос на обновления access токена*/
        /*потробовать с помощь рефреша*/
        const resultTokens = await defaultRequest("", "");
        const dispatch = useAppDispatch();
        dispatch(setCredentials(resultTokens));
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