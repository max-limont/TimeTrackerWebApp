import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { graphqlRequest } from "../../api";
import { setUser } from "../../../../store/slice/authentication/authSlice";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import {getUserByIdQuery} from "../../../../graphqlQuery/user/userQuery";


const fetchUserById = (action$: any) => {
 return action$.pipe(
        ofType(fetchUserByIdActionType),
        mergeMap((action: any) => from(graphqlRequest(getUserByIdQuery, {
            id: action.payload
        })).pipe(
            map(response => {
                return setUser(response!.getUserById);
            })
        )));
}

export const userEpics = combineEpics(fetchUserById);

