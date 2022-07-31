import jwt_decode from "jwt-decode";

export function parseJwt<Type>(jwtToken:string):Type{
    
    return jwt_decode(jwtToken);
}

