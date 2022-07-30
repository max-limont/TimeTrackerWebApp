import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { defaultRequest } from "../../../../app/api/api";
import { authUserActionType } from "../../../actions/auth/authActions";
import { authUserQuery } from "../graphqlQuery/auth/authQuery";
import { setCredentials, setToken } from "../../authentication/authSlice";


const authUser = (action$: any) =>{
 return action$.pipe(
        ofType(authUserActionType),
        mergeMap((action: any) => from(defaultRequest(authUserQuery, {
            user: action.payload
        }))
            .pipe(
                map(response => {
                    console.log(response);
                    
                    return setToken(response.data.auth_login);
                }))));}

export const authEpics = combineEpics(authUser);