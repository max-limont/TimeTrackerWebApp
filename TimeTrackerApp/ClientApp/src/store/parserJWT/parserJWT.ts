import jwt_decode from "jwt-decode";

export function parseJwt(jwtToken:string){
    return jwt_decode(jwtToken);
}