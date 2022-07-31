import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { usebaseQueryWithReauth, defaultRequest } from "../../../../app/api/api";
import { authUserActionType } from "../../../actions/auth/authActions";
import { authUserQuery } from "../graphqlQuery/auth/authQuery";
import {  logOut, setToken, setUser } from "../../authentication/authSlice";
import { fetchUserByIdActionType } from "../../../actions/user/userActions";
import { getUserById } from "../graphqlQuery/user/userQuery";


const fetchUserById = (action$: any) =>{
    console.log(123);
 return action$.pipe(
        ofType(fetchUserByIdActionType),
        mergeMap((action: any) => from(usebaseQueryWithReauth(getUserById, {
            id: action.payload
        }))
            .pipe(
                map(response => {
                    console.log(response);
                    return setUser(response.user_GetById);
                }))));}

export const userEpics = combineEpics(fetchUserById);

