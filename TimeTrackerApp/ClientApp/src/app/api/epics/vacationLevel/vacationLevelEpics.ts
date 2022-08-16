import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { getAllVacationsLevel } from "../../../../graphqlQuery/vacationLevel/vacationLevelQuries";
import { getAllVacationLevelTypeAction } from "../../../../store/actions/vacationLevel/vacationLevel";
import { setVacationLevels } from "../../../../store/slice/vacationLevel/vacationLevelSlice";
import { graphqlRequest } from "../../api";
import {Action} from "react-epics";

const getVacationLevelsEpic = (action$: any) => {
    return action$.pipe(
        ofType(getAllVacationLevelTypeAction),
        mergeMap(() => from(graphqlRequest(getAllVacationsLevel))
            .pipe(
                map(response => {
                    if (!response?.errors) {
                        return setVacationLevels(response.data.vacationLevelQueries.getAllVacationsLevel);
                    }
                    return {type: 'GetVacationLevelsError', payload: "Error" } as Action
                }))));}

export const vacationLevelEpic = combineEpics(getVacationLevelsEpic);