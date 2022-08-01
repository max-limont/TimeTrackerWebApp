import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { usebaseQueryWithReauth, defaultRequest } from "../../api";
import { authUserActionType } from "../../../../store/actions/auth/authActions";
import { authUserQuery } from "../../../../graphqlQuery/auth/authQuery";
import {  logOut, setToken, setUser } from "../../../../store/slice/authentication/authSlice";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import { getUserById } from "../../../../graphqlQuery/user/userQuery";


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

