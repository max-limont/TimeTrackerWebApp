import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { defaultRequest, graphqlRequest } from "../../../../app/api/api";
import { authUserActionType } from "../../../actions/auth/authActions";
import { authUserQuery } from "../graphql/auth/authQuery";
import { setCredentials } from "../../authentication/authSlice";
import { AuthUser } from "../../../../type/User/AuthUser";


const authUser = (action$: any) =>{
    console.log(123);
 return action$.pipe(
        ofType(authUserActionType),
        mergeMap((action: any) => from(defaultRequest(authUserQuery, {
            user: action.payload
        }))
            .pipe(
                map(response => {
                    console.log(123);
                    return setCredentials(response);
                }))));}

export const authEpics = combineEpics(authUser);