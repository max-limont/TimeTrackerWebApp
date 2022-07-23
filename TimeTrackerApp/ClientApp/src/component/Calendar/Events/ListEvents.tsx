import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CreateEvent } from "../FormsCalendar/CreateEvent";


export function ListEvents() {
    const [isSelectedForm, setForm] = useState(false);
    const dayEvents = useAppSelector(s => s.rootReducer.calendar.events).filter(s => s.dateCreate == useAppSelector(s => s.rootReducer.calendar.currentDateList));

    const Form = () => {
        if (isSelectedForm)
            return (
                <div>
                    <button onClick={() => setForm(false)}>X</button>
                    <CreateEvent />
                </div>
            );
    }

    return (
        <>
            <div>
               
                <div>{Form()}</div>
                <table>
                    <tr>
                        <td>Name Event</td>
                        <td>Date</td>
                        <td>Description</td>
                    </tr>
                    {dayEvents.map(s =>
                        <>
                            <tr>
                                <td>{s.title}</td>
                                <td>{s.dateCreate}</td>
                                <td>{s.desription}</td>
                            </tr>
                        </>
                    )}
                </table>
                <button onClick={() => setForm(true)}>Create Event</button>
            </div>
        </>
    );
}