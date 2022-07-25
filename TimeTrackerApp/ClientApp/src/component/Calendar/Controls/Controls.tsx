import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { initCalendar, nextMonth, prevMonth } from "../../../store/slice/calendar/calendarSlice";
import { CreateEvent } from "../FormsCalendar/CreateEvent";


export function Controls() {
    const dispatch = useAppDispatch();
    const [isSelectedForm, setForm] = useState(false);
    const month = useAppSelector((s) => s.rootReducer.calendar.currentCalendar).format("MMMM");
    const year = useAppSelector((s) => s.rootReducer.calendar.currentCalendar).format("yyyy");

    const CreateEventForm = () => {
        if (isSelectedForm)
            return (
                <div className="form-event">
                    <button onClick={()=>setForm(false)}>X</button>
                    <CreateEvent />
                </div>
            )
    }
    return (
        <>
            {CreateEventForm()}
            < div className="calendar-controls" >
                <div>
                    <span style={{ fontSize: "25px" }}>{month} </span>
                    <span>{year}</span>
                </div>
                <div className="control-panel">
                    <button onClick={() => setForm(true)}>Add Event</button>
                    <button onClick={() => dispatch(prevMonth())}>{"<"}</button>
                    <button onClick={() => dispatch(initCalendar())}>Todday</button>
                    <button onClick={() => dispatch(nextMonth())}>{">"}</button>
                </div>
            </div >
        </>);
}