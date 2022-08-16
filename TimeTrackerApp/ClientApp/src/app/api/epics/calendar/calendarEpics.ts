import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {
    createCalendarDay, editCalendarDay,
    fetchAllCalendarDays,
    fetchCalendarDaysRange, removeCalendarDay
} from "../../../../store/actions/calendar/calendarActions";
import {
    CreateCalendarDayInputType,
    createCalendarDayMutation, EditCalendarDayInputType, editCalendarDayMutation,
    fetchAllCalendarDaysQuery, FetchCalendarDaysRangeInputType,
    fetchCalendarDaysRangeQuery, RemoveCalendarDayInputType, removeCalendarDayMutation
} from "../../../../graphqlQuery/calendar/calendarQueries";
import {createDay, editDay, removeDay, setDays, setDaysRange} from "../../../../store/slice/calendar/calendarSlice";
import { CalendarDayType } from "../../../../type/CalendarDay/CalendarDayType";
import {graphqlRequest} from "../../api";
import {store} from "../../../store";
import {Action} from "react-epics";

const fetchAllCalendarDaysEpic: Epic = (action$: Observable<ReturnType<typeof fetchAllCalendarDays>>): any => {
    return action$.pipe(
        ofType(fetchAllCalendarDays.type),
        mergeMap(action => from(graphqlRequest(fetchAllCalendarDaysQuery)).pipe(
            map(response => {
                if (response?.data?.fetchAllCalendarDays) {
                    const responseCalendarDays = response.data.fetchAllCalendarDays
                    const calendarDays: CalendarDayType[] = responseCalendarDays?.map((day: any) => ({
                        id: parseInt(day?.id),
                        title: day?.title,
                        date: new Date(day?.date),
                        dayTypeId: parseInt(day?.dayTypeId),
                        endDate: day?.endDate ? new Date(day.endDate) : null
                    }) as CalendarDayType)
                    store.dispatch(setDays(calendarDays))
                    return {type: "FetchAllCalendarDaysSuccess", payload: "Success"} as Action
                }
                return {type: "FetchAllCalendarDaysError", payload: "Error"} as Action
            })
        ))
    )
}


const fetchCalendarDaysRangeEpic: Epic = (action$: Observable<ReturnType<typeof fetchCalendarDaysRange>>): any => {
    return action$.pipe(
        ofType(fetchCalendarDaysRange.type),
        mergeMap(action => from(graphqlRequest(fetchCalendarDaysRangeQuery, {
            startDate: action.payload.startDate.toLocaleDateString('sv'),
            finishDate: action.payload.finishDate.toLocaleDateString('sv'),
        } as FetchCalendarDaysRangeInputType)).pipe(
            map(response => {
                if (response?.data?.fetchCalendarDaysRange) {
                    const apiResponse = response.data.fetchCalendarDaysRange
                    const calendarDays: CalendarDayType[] = apiResponse.map((day: any) => ({
                        id: parseInt(day?.id),
                        title: day?.title,
                        date: new Date(day?.date),
                        dayTypeId: parseInt(day?.dayTypeId),
                        endDate: day?.endDate ? new Date(day.endDate) : null
                    }) as CalendarDayType)
                    store.dispatch(setDays(calendarDays))
                    return {type: "FetchCalendarDaysRangeSuccess", payload: "Success"} as Action
                }
                return {type: "FetchCalendarDaysRangeError", payload: "Error"} as Action
            })
        ))
    )
}


const createCalendarDayEpic: Epic = (action$: Observable<ReturnType<typeof createCalendarDay>>): any => {
    return action$.pipe(
        ofType(createCalendarDay.type),
        mergeMap(action => from(graphqlRequest(createCalendarDayMutation, {
            calendarDay: action.payload
        } as CreateCalendarDayInputType)).pipe(
            map(response => {
                if (response?.data?.createCalendarDay) {
                    const day = response.data.createCalendarDay
                    const calendarDay: CalendarDayType = {
                        id: parseInt(day?.id),
                        title: day?.title,
                        date: new Date(day?.date),
                        dayTypeId: parseInt(day?.dayTypeId),
                        endDate: day?.endDate ? new Date(day.endDate) : null
                    }
                    store.dispatch(createDay(calendarDay));
                    return {type: "CreateCalendarDaySuccess", payload: "Success"} as Action
                }
                return {type: "CreateCalendarDayError", payload: "Error"} as Action
            })
        ))
    )
}

const editCalendarDayEpic: Epic = (action$: Observable<ReturnType<typeof editCalendarDay>>): any => {
    return action$.pipe(
        ofType(editCalendarDay.type),
        mergeMap(action => from(graphqlRequest(editCalendarDayMutation, {
            calendarDay: action.payload
        } as EditCalendarDayInputType)).pipe(
            map(response => {
                if (response?.data?.editCalendarDay) {
                    store.dispatch(editDay(action.payload))
                    return {type: "EditCalendarDaySuccess", payload: "Success"} as Action
                }
                return {type: "EditCalendarDayError", payload: "Error"} as Action
            })
        ))
    )
}

const removeCalendarDayEpic: Epic = (action$: Observable<ReturnType<typeof removeCalendarDay>>): any => {
    return action$.pipe(
        ofType(removeCalendarDay.type),
        mergeMap(action => from(graphqlRequest(removeCalendarDayMutation, {
            id: action.payload
        } as RemoveCalendarDayInputType)).pipe(
            map(response => {
                if (response?.data?.removeCalendarDay) {
                    store.dispatch(removeDay(action.payload))
                    return {type: "RemoveCalendarDaySuccess", payload: "Success"} as Action
                }
                return {type: "RemoveCalendarDayError", payload: "Error"} as Action
            })
        ))
    )
}


export const calendarEpics = combineEpics(fetchAllCalendarDaysEpic, fetchCalendarDaysRangeEpic, createCalendarDayEpic, editCalendarDayEpic, removeCalendarDayEpic);

