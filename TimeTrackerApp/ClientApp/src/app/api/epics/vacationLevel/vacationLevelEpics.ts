import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { getAllVacationsLevel } from "../../../../graphqlQuery/vacationLevel/vacationLevelQuries";
import { getAllVacationLevelTypeAction } from "../../../../store/actions/vacationLevel/vacationLevel";
import { setVacationLevels } from "../../../../store/slice/vacationLevel/vacationLevelSlice";
import { graphqlRequest } from "../../api";

const getVacationLevelsEpic = (action$: any) => {
    return action$.pipe(
        ofType(getAllVacationLevelTypeAction),
        mergeMap(() => from(graphqlRequest(getAllVacationsLevel))
            .pipe(
                map(response => {
                    if (response.errors == undefined) {
                        return setVacationLevels(response.data.vacationLevelQueries.getAllVacationsLevel);
                    }
                    throw new Error();
                }))));}

export const vacationLevelEpic = combineEpics(getVacationLevelsEpic);