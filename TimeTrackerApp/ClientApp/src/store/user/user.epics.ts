import { combineEpics, ofType } from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import { graphqlRequest } from "../../graphql/api";
import {parseObjectToUser, setUser} from "./user.slice";
import {getUserByIdQuery} from "../../graphql/queries/user.queries";
import {GetUserByIdQueryInputType, User} from "../../types/user.types";
import {Epic} from "redux-observable";
import {getUserById} from "./user.slice";


const getUserByIdEpic: Epic = (action$: Observable<ReturnType<typeof getUserById>>): any => {
    return action$.pipe(
        ofType(getUserById.type),
        mergeMap(action => from(graphqlRequest(getUserByIdQuery, {
            id: action.payload.id
        } as GetUserByIdQueryInputType)).pipe(
            map(response => {
                if (response?.data?.getUserById) {
                    const user = parseObjectToUser(response.data.getUserById);
                    return setUser(user);
                }
            })
        )));
}

export const userEpics = combineEpics(getUserByIdEpic);

