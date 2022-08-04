import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { usebaseQueryWithReauth, defaultRequest } from "../../api";
import { fetchAllEventsType } from "../../../../store/actions/calendar/calendarActions";
import { fetchAllEventsQuery } from "../../../../graphqlQuery/calendar/calendarQueries";
import { setEvents } from "../../../../store/slice/calendar/calendarSlice";


const fetchAllEventsEpic = (action$: any) =>{
    console.log(123)
 return action$.pipe(
        ofType(fetchAllEventsType),
        mergeMap(() => from(usebaseQueryWithReauth(fetchAllEventsQuery))
            .pipe(
                map(response => {
                    console.log(response);
                    return setEvents(response.data.getEvents);
                }))));}

export const calendarEpics = combineEpics(fetchAllEventsEpic);

