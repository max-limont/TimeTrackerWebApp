import jwtDecode from "jwt-decode";

export const parseJwt = <Type>(jwtToken: string): Type => {
    return jwtDecode(jwtToken);
}