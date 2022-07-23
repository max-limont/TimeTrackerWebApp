import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addEvent } from "../../../store/slice/calendar/calendarSlice";
import { CreateEventObject, CreateEventType } from "../../../type/Events/CreateEventType";

export function CreateEvent() {
    const dispatch = useAppDispatch();
    const date = useAppSelector(s => s.rootReducer.calendar.currentDateList);
    const [event, setEvent] = useState({
        ...CreateEventObject,
        dateCreate: date
    });
    const onFinish = (e: React.FormEvent) => {
        console.log(123);
        e.preventDefault();
        dispatch(addEvent({
            ...event,
            id: 8495
        }));
    }
    const { title, description } = event;

    return (
        <form  onSubmit={(e) => onFinish(e)}>
            <div>
                <label>Name Event</label>
                <input value={title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
            </div>
            <div>
                <label>Description</label>
                <input value={description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </div>
            <div>
                <input type="date" />
            </div>
            <div>
                <button type="submit">Add</button>
                <button type="reset">Reset</button>
            </div>
        </form>);
}