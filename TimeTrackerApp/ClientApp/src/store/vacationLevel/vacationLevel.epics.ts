import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import { getAllVacationsLevel } from "../../graphql/queries/vacationLevel.queries";
import {getAllVacationLevelAction, setVacationLevels} from "./vacationLevel.slice";
import { graphqlRequest } from "../../graphql/api";
import {Action} from "react-epics";

const getVacationLevelsEpic: Epic = (action$: Observable<ReturnType<typeof getAllVacationLevelAction>>): any => {
    return action$.pipe(
        ofType(getAllVacationLevelAction.type),
        mergeMap(action => from(graphqlRequest(getAllVacationsLevel)).pipe(
            map(response => {
                if (!response?.errors) {
                    return setVacationLevels(response.data.vacationLevelQueries.getAllVacationsLevel);
                }
                return {type: 'GetVacationLevelsError', payload: "Error" } as Action
            }))
        )
    )
}

export const vacationLevelEpic = combineEpics(getVacationLevelsEpic);