import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { usebaseQueryWithReauth, defaultRequest } from "../../api";
import {
    addEventType,
    fetchAllEventsType,
    fetchRangeEventsAction,
    fetchRangeEventsType
} from "../../../../store/actions/calendar/calendarActions";
import {addEventQuery, fetchAllEventsQuery, fetchRangeEventQuery} from "../../../../graphqlQuery/calendar/calendarQueries";
import { addEvent, setEvents, setRangeEvents } from "../../../../store/slice/calendar/calendarSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { EventType } from "../../../../type/Events/EventType";
import moment from "moment";


function formatDateToNormalFormat(array:EventType[]){
    return array.map(item=>{
        return {...item, date: moment(item.date).format("yyyy-MM-DD")}
    });
}

const fetchAllEventsEpic = (action$: any) =>{
 return action$.pipe(
        ofType(fetchAllEventsType),
        mergeMap(() => from(usebaseQueryWithReauth(fetchAllEventsQuery))
            .pipe(
                map(response => {
                    console.log(response);
                    return setEvents( formatDateToNormalFormat(response.data.getEvents));
                }))))};

const fetchRangeEventEpic = (action$:any)=>{
    return action$
        .pipe(
        ofType(fetchRangeEventsType),
            mergeMap((action:any)=> from(usebaseQueryWithReauth(fetchRangeEventQuery,{
                startDate: action.payload.startDate,
                finishDate: action.payload.finishDate
            }))
            .pipe(
                map((response:any)=>{
                    console.log(response);
                    return setRangeEvents(formatDateToNormalFormat(response.data.getRangeEvents));
                }))))};

const addEventEpic =(action$:any)=>{
    console.log("here")
    return action$
    .pipe(
    ofType(addEventType),
        mergeMap((action:any)=> from(usebaseQueryWithReauth(addEventQuery,{
           event: action.payload
        }))
        .pipe(
            map((response:any)=>{
                console.log(response);
                
                return addEvent({...response.data.addEvent,
                    date: moment(response.data.addEvent.date).format("yyyy-MM-DD")});
            }))))};
 
export const calendarEpics = combineEpics(fetchAllEventsEpic,fetchRangeEventEpic,addEventEpic);

