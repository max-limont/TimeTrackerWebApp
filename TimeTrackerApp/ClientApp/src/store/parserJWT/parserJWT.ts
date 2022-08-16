import jwtDecode from "jwt-decode";
import {useAppDispatch} from "../../app/hooks";

export const parseJwt = <Type>(jwtToken: string): Type => {
    return jwtDecode(jwtToken);
}