import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { defaultRequest } from "../../api";
import { authUserActionType } from "../../../../store/actions/auth/authActions";
import { authUserQuery } from "../../../../graphqlQuery/auth/authQuery";
import {  logOut, setToken } from "../../../../store/slice/authentication/authSlice";
import { store } from "../../../store";
import { AuthorizationUser } from "../../../../type/User/AuthUser";



  // get the JWT token out of it
  // (obviously depends on how your store is structured)

const authUser = (action$: any) =>{
 return action$.pipe(
        ofType(authUserActionType),
        mergeMap((action: any ) => from(defaultRequest(authUserQuery, {
            email: action.payload.email,
            password: action.payload.password
        }))
            .pipe(
                map(response => {
                    console.log(response)
                    if(response.data.auth_login.accessToken==null){
                        return logOut();
                    }
                    return setToken(response.data.auth_login);
                }))));}

export const authEpics = combineEpics(authUser);