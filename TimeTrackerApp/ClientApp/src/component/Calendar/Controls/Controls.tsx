import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { initCalendar, nextMonth, prevMonth } from "../../../store/slice/calendar/calendarSlice";


export function Controls() {
    const dispatch = useAppDispatch();
    const month= useAppSelector((s)=>s.rootReducer.calendar.currentCalendar).format("MMMM");
    const year = useAppSelector((s)=>s.rootReducer.calendar.currentCalendar).format("yyyy");

    return (
        <div className="calendar-controls">
            <div>
                <span style={{ fontSize: "25px" }}>{month} </span>
                <span>{year}</span>
            </div>
            <div className="control-panel">
                <button onClick={()=>null}>Add Event</button>
                <button onClick={()=>dispatch(prevMonth())}>{"<"}</button>
                <button  onClick={()=>dispatch(initCalendar())}>Todday</button>
                <button onClick={()=>dispatch(nextMonth())}>{">"}</button>
            </div>
        </div>);
}