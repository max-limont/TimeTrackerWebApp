import { combineEpics, ofType } from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import { graphqlRequest } from "../../graphql/api";
import {parseObjectToUser, setUser} from "./user.slice";
import {getUserByIdQuery} from "../../graphql/queries/user.queries";
import {Epic} from "redux-observable";
import {getUserById} from "./user.slice";
import {Action} from "react-epics";


const getUserByIdEpic: Epic = (action$: Observable<ReturnType<typeof getUserById>>): any => {
    return action$.pipe(
        ofType(getUserById.type),
        mergeMap((action :any) => from(graphqlRequest(getUserByIdQuery, action.payload)).pipe(
            map(response => {
                if (response?.data?.getUserById) {
                    const user = parseObjectToUser(response.data.getUserById);
                    return setUser(user);
                }
                return {type: "GetUserByIdError", payload: "Error"} as Action
            })
        )));
}

export const userEpics = combineEpics(getUserByIdEpic);

