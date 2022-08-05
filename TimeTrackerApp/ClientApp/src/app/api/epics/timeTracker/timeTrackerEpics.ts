import {Epic, ofType} from "redux-observable";
import {timeTrackerSlice} from "../../../../store/slice/timeTracker/timeTrackerSlice";
import {RootState} from "../../../store";
import {from, mergeMap} from "rxjs";
import {graphqlRequest} from "../../api";

/*export const setRecordsEpic: Epic<ReturnType<typeof timeTrackerSlice.actions.setRecords>, any, RootState> = (action$, state$) => {
    action$.pipe(
        ofType(typeof timeTrackerSlice.actions.setRecords),
        mergeMap(action => from(graphqlRequest()))
    )
}*/