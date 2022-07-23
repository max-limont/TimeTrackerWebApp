import React, { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CreateEventObject, CreateEventType } from "../../../type/Events/CreateEventType";

export function CreateEvent() {
    const [event, setEvent] = useState({ ...CreateEventObject, dateCreate: useAppSelector(s=>s.rootReducer.calendar.currentDateList) });
    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
    }
    const { title, description } = event
    return (
        <form onSubmit={(e) => onFinish(e)}>
            <div>
                <label>Name Event</label>
                <input value={title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
            </div>
            <div>
                <label>Description</label>
                <input value={description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
            </div>
            <div>
                <button type="submit">Add</button>
                <button type="reset">Reset</button>
            </div>
        </form>);
}