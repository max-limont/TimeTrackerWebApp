import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { defaultRequest } from "../../../../app/api/api";
import { authUserActionType } from "../../../actions/auth/authActions";
import { authUserQuery } from "../graphqlQuery/auth/authQuery";
import {  logOut, setToken } from "../../authentication/authSlice";
import { store } from "../../../../app/store";



  // get the JWT token out of it
  // (obviously depends on how your store is structured)

const authUser = (action$: any) =>{
 return action$.pipe(
        ofType(authUserActionType),
        mergeMap((action: any) => from(defaultRequest(authUserQuery, {
            user: action.payload
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