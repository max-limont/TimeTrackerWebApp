import {combineEpics} from "redux-observable";
import {fetchAllEventsType} from "../../../../store/actions/calendar/calendarActions";
import {defaultRequest} from "../../api";
import {fetchAllEventsQuery} from "../../../../graphqlQuery/calendar/calendarQueries";
import { from, map, mergeMap } from "rxjs";
import {setEvents} from "../../../../store/slice/calendar/calendarSlice";


const  fetchAllEvent = (action$:any)=>{
    return action$
        .ofType(fetchAllEventsType)
        .mergeMap(()=>from(defaultRequest(fetchAllEventsQuery)))
        .pipe(
            map((response:any)=>{
                console.log(response);
                return setEvents(response.data.getEvents);
            })
        )
};

export const calendarEpics = combineEpics(fetchAllEvent);
