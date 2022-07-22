import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CreateEvent } from "../FormsCalendar/CreateEvent";


export function ShortListEvents({ date }: any) {
    const dayEvents = useAppSelector(s => s.rootReducer.calendar.events).filter(s => s.dateCreate == date);
    const [isForm, setIsForm] = useState(false);
    const Form = () => {
        if (isForm)
            return (
                <div className="form-event">
                    <button onClick={() => setIsForm(false)}>X</button>
                    <CreateEvent date={date} />
                </div>
            );
    }

    return (
        <>
            <div className="event-block">
                <div>
                    {Form()}
                </div>
                <div onClick={() => setIsForm(true)} className="events">
                    {dayEvents.map(s =>
                        <div className="event" key={s.id}>{s.title}</div>)}
                </div>
            </div>
        </>
    );
}