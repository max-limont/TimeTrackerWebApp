import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CreateEvent } from "../FormsCalendar/CreateEvent";


export function ListEvents() {
    const dayEvent = useAppSelector(s => s.rootReducer.calendar.currentDateList)
    const dayEvents = useAppSelector(s => s.rootReducer.calendar.events).filter(s => s.date == dayEvent);

    return (
        <>
            <div>{dayEvent}</div>
            <table>
                <tbody>
                    <tr>
                        <td>Name Event</td>
                        <td>Description</td>
                    </tr>
                    {dayEvents.map(s =>
                        <tr key={s.id}>
                            <td>{s.title}</td>
                            <td>{s.description}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}