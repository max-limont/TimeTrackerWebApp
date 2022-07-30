import { Cookies } from "react-cookie";

 type TypeCookie={
    value: string,
    key: string,
    daysLife: number,
}
export const refreshTokenKey="refreshToken";

export function  setCookie(obj:TypeCookie){
const cookie = new Cookies();
cookie.set(obj.key, obj.value, {maxAge: obj.daysLife*3600*24})
}