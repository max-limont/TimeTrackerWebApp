import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CreateEvent } from "../FormsCalendar/CreateEvent";
import { EditEvent } from "../FormsCalendar/EditEvent";


export function ListEvents() {
    const dayEvent = useAppSelector(s => s.rootReducer.calendar.currentDateList)
    const dayEvents = useAppSelector(s => s.rootReducer.calendar.events).filter(s => s.date == dayEvent);
    const [isSelectedForm, setForm] = useState(false);
    const [id,setId]= useState(0);
    const EditEventForm = () => {
        if (isSelectedForm)
            return (
                <div className="edit-event-form">
                    <button onClick={()=>setForm(false)}>X</button>
                    <EditEvent id={id}/>
                </div>
            );
    }
    return (
        <>
        {EditEventForm()}
            <div>{dayEvent}</div>
            <table>
                <tbody>
                    <tr>
                        <td>Name Event</td>
                        <td>Description</td>
                        <td>Action</td>
                    </tr>
                    {dayEvents.map(s =>
                        <tr key={s.id}>
                            <td>{s.title}</td>
                            <td>{s.description}</td>
                            <td onClick={() => {
                                setForm(true);
                                setId(s.id)}}>Edit</td>
                            <td>Delete</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}