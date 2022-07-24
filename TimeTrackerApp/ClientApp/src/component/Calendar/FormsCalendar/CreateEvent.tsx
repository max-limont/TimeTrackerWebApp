import moment from "moment";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addEvent } from "../../../store/slice/calendar/calendarSlice";
import { CreateEventObject, CreateEventType } from "../../../type/Events/CreateEventType";

export function CreateEvent() {
    const dispatch = useAppDispatch();
    const events = useAppSelector(s => s.rootReducer.calendar.events);
    const id = events[events.length - 1].id + 1;
    const [event, setEvent] = useState({ ...CreateEventObject, date: moment().format("yyyy-MM-DD") });
    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addEvent({
            ...event,
            id: id
        }));
    }
    const { title, description, date } = event;

    return (
        <form onSubmit={(e) => onFinish(e)}>
            <table>
                <tbody>
                    <tr>
                        <td><label>Name Event</label></td>
                        <td><input value={title} onChange={(e) => setEvent({ ...event, title: e.target.value })} /></td>
                    </tr>
                    <tr>
                        <td><label>Description</label></td>
                        <td><textarea value={description} onChange={(e) => setEvent({ ...event, description: e.target.value })}></textarea></td>
                    </tr>
                    <tr>
                        <td><label>Date</label></td>
                        <td>  <input type="date" value={date} onChange={(e) => setEvent({ ...event, date: e.target.value })} /></td>
                    </tr>
                </tbody>
            </table>
            <button type="submit">Add</button>    <button type="reset">Reset</button>
        </form>);
}