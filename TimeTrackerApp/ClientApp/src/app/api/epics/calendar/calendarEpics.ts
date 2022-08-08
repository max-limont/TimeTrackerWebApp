import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import {
    addEventType, fetchAllEventsType, fetchRangeEventsType, removeEventType, updateEventType
} from "../../../../store/actions/calendar/calendarActions";
import { addEventQuery, deleteEventQuery, editEventQuery, fetchAllEventsQuery, fetchRangeEventQuery } from "../../../../graphqlQuery/calendar/calendarQueries";
import { addEvent, editEvent, removeEvent, setEvents, setRangeEvents } from "../../../../store/slice/calendar/calendarSlice";
import { EventType } from "../../../../type/Events/EventType";
import moment from "moment";
import {graphqlRequest} from "../../api";


function formatDateToNormalFormat(array: EventType[]) {
    return array.map(item => {
        let endDate:any= moment(item.endDate).format("yyyy-MM-DD");
        if(endDate=="Invalid date"){
            endDate=null;
        }
        
        return {
            ...item,
            date: moment(item.date).format("yyyy-MM-DD"),
            endDate: endDate
        }
    });
}


const fetchAllEventsEpic = (action$: any) => {
    return action$.pipe(
        ofType(fetchAllEventsType),
        mergeMap(() => from(graphqlRequest(fetchAllEventsQuery))
            .pipe(
                map(response => {
                    console.log(response);
                    return setEvents(formatDateToNormalFormat(response.data.getEvents));
                }))))
};


const fetchRangeEventEpic = (action$: any) => {
    return action$
        .pipe(
            ofType(fetchRangeEventsType),
            mergeMap((action: any) => from(graphqlRequest(fetchRangeEventQuery, {
                startDate: action.payload.startDate,
                finishDate: action.payload.finishDate
            }))
                .pipe(
                    map((response: any) => {
                        console.log(response);
                        return setRangeEvents(formatDateToNormalFormat(response.data.getRangeEvents));
                    }))))
};


const addEventEpic = (action$: any) => {
    console.log("here")
    return action$
        .pipe(
            ofType(addEventType),
            mergeMap((action: any) => from(graphqlRequest(addEventQuery, {
                event: action.payload
            }))
                .pipe(
                    map((response: any) => {
                        console.log(response);

                        return addEvent({
                            ...response.data.addEvent,
                            date: moment(response.data.addEvent.date).format("yyyy-MM-DD"),
                            endDate: moment(response.data.addEvent.endDate).format("yyyy-MM-DD")
                        });
                    }))))
};

const editEventEpic = (action$: any) => {
    return action$
        .pipe(
            ofType(updateEventType),
            mergeMap((action: any) => from(graphqlRequest(editEventQuery, {
                event: action.payload
            }))
                .pipe(
                    map((response: any) => {
                        console.log(response);
                        return editEvent(response.data.updateEvent);
                    }))))
};

const deleteEventEpic = (action$: any) => {
    return action$
        .pipe(
            ofType(removeEventType),
            mergeMap((action: any) => from(graphqlRequest(deleteEventQuery, {
                id: action.payload
            }))
                .pipe(
                    map((response: any) => {
                        console.log(response);
                        const id: number = response.data.deleteEvent.id;
                        return removeEvent(id);
                    }))))
};


export const calendarEpics = combineEpics(fetchAllEventsEpic, fetchRangeEventEpic, addEventEpic, editEventEpic, deleteEventEpic);

