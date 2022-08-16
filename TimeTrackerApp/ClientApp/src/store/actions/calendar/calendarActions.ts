import {createAction} from "@reduxjs/toolkit";
import {CalendarDayType} from "../../../type/CalendarDay/CalendarDayType";
import {CreateCalendarDayType} from "../../../type/CalendarDay/CreateCalendarDayType";
import { DateInputType } from "../../../type/DateInputType";

export const fetchCalendarDaysRange = createAction<DateInputType>("FetchCalendarDaysRange");
export const fetchAllCalendarDays = createAction("FetchAllCalendarDays");
export const getCalendarDayById = createAction<number>("GetCalendarDayById");
export const createCalendarDay = createAction<CreateCalendarDayType>("CreateCalendarDay");
export const editCalendarDay = createAction<CalendarDayType>("EditCalendarDay");
export const removeCalendarDay = createAction<number>("RemoveCalendarDay");


 
