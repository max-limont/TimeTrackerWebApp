import {createAction} from "@reduxjs/toolkit";
import {EventType} from "../../../type/Events/EventType";
import {CreateEventType} from "../../../type/Events/CreateEventType";
import { DateInputType } from "../../../type/DateInputType";

export const fetchAllEventsType = "fetchAllEvents";
export const fetchRangeEventsType = "fetchRangeEvents";
export const fetchEventByIdType = "fetchEventById";
export const addEventType = "addEvent";
export const removeEventType = "removeEvent";
export const updateEventType= "updateEvent";



export const fetchAllEventsAction = createAction(fetchAllEventsType);
export const fetchRangeEventsAction = createAction<DateInputType>(fetchRangeEventsType);
export const addEventAction = createAction<CreateEventType>(addEventType);
export const removeEventAction = createAction<number>(removeEventType);
export const fetchEventByIdAction = createAction<number>(fetchEventByIdType);
export const updateEventAction= createAction<EventType>(updateEventType);


 
