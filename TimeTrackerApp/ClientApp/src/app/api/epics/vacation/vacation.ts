import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { graphqlRequest } from "../../api";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import {getUserByIdQuery} from "../../../../graphqlQuery/user/userQuery";


const vacationGetByUserId = (action$: any) => {
    return action$.pipe(
        ofType(fetchUserByIdActionType),
        mergeMap((action: any) => from(graphqlRequest("", {
            id: action.payload
        })).pipe(
            map(response => {
            })
        )));
}

export const vacationEpic = combineEpics(vacationGetByUserId);