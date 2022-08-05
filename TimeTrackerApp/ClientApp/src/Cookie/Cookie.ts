import { Cookies } from "react-cookie";

type CookieType = {
    value: string,
    key: string,
    daysLife: number,
}

export const refreshTokenKey = "refreshToken";

export const setCookie = (cookie: CookieType): void => {
    const cookies = new Cookies();
    cookies.set(cookie.key, cookie.value, {maxAge: cookie.daysLife * 3600 * 24})
}

export const clearCookie = (cookieKey: string): void => {
    const cookies = new Cookies();
    cookies.remove(cookieKey);
}

export const getCookie = (cookieKey: string): string => {
    const cookies = new Cookies();
    return cookies.get(cookieKey);
}