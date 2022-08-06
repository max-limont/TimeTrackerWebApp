import { Cookies } from "react-cookie";

type CookieType = {
    value: string,
    key: string,
    lifetime: number,
}

export const refreshTokenKey = "refreshToken";
export const accessTokenKey = "accessToken";

export const setCookie = (cookie: CookieType): void => {
    const cookies = new Cookies();
    cookies.set(cookie.key, cookie.value, {maxAge: cookie.lifetime})
}

export const clearCookie = (cookieKey: string): void => {
    const cookies = new Cookies();
    cookies.remove(cookieKey);
}

export const getCookie = (cookieKey: string): string => {
    const cookies = new Cookies();
    return cookies.get(cookieKey);
}