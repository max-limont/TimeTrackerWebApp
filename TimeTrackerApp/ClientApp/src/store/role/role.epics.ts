
import { from, Observable, map, mergeMap, } from "rxjs";
import { getRolesAction, setRoles } from "./role.slice";
import {combineEpics, Epic, ofType} from "redux-observable";
import { graphqlRequest } from "../../graphql/api";
import { getRolesQuery } from "../../graphql/queries/role.queries";

const getRolesEpic:Epic = (action$: Observable<ReturnType<typeof getRolesAction>>): any => {
    return action$.pipe(
        ofType(getRolesAction.type),
        mergeMap(() => from(graphqlRequest(getRolesQuery)).pipe(
            map(response => {
                if (response?.data) {
                  return setRoles(response.data.roleQuery.getRoles)
                }
                throw new Error();
            })
        ))
    )
}

export const roleEpic = combineEpics(getRolesEpic);

