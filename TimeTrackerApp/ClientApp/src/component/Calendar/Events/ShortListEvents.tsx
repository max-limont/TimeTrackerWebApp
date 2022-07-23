import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { CreateEvent } from "../FormsCalendar/CreateEvent";
import { ListEvents } from "./ListEvents";


export function ShortListEvents({ date }: any) {
    const dayEvents = useAppSelector(s => s.rootReducer.calendar.events).filter(s => s.dateCreate == date);
    const [isSelectedFullList, setIsSelected] = useState(false);
    const fullList = () => {
        if (isSelectedFullList) {
            return (
                <div className="form-event">
                    <button onClick={() => setIsSelected(false)}>X</button>
                    <ListEvents />
                </div>
            );
        }

    }

    return (
        <>
            <div className="event-block">
                <div>
                    {fullList()}
                </div>
                <div onClick={() => setIsSelected(true)} className="events">
                    {dayEvents.map(s =>
                        <div className="event" key={s.id}>{s.title}</div>)}
                </div>
            </div>
        </>
    );
}