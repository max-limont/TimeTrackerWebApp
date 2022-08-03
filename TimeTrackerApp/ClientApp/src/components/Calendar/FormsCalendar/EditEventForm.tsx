import React, {FC, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { editEventAction, removeEvent } from "../../../store/slice/calendar/calendarSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

type EditFormPropsType = {
    id: number,
    visible: boolean,
    setVisible: (value: boolean) => void
}


export const EditEventForm: FC<EditFormPropsType> = (props) => {
    const dispatch = useAppDispatch();
    const { id, visible, setVisible} = props;
    const event = useAppSelector(s => s.rootReducer.calendar.events).find(s => s.id == id);
    const [editEvent, setEvent] = useState(event);

    useEffect(() => {
        setEvent(event)
    }, [event])

    const onFinish=(e: React.FormEvent)=>{
        e.preventDefault();
        if(editEvent != undefined)
            dispatch(editEventAction(editEvent));
        setVisible(false);
        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
    }

    if (editEvent) {
        return (
            <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
                <div className={"form-event"}>
                    <div className={"form-header"}>
                        <h2>Edit event</h2>
                        <button className={"button red-button close"} onClick={() => {
                            setVisible(false)
                            document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
                        }}>
                            <FontAwesomeIcon icon={faXmark} className={"icon"} />
                        </button>
                    </div>
                    <form onSubmit={(e) => onFinish(e)}>
                        <div className={"form-group"}>
                            <div className={"form-item w-100"}>
                                <label>Name</label>
                                <input value={editEvent?.title} onChange={(e) => setEvent({ ...editEvent, title: e.target.value })} />
                            </div>
                            <div className={"form-item w-100"}>
                                <label>Date</label>
                                <input type="date" value={editEvent?.date} onChange={(e) => setEvent({ ...editEvent, date: e.target.value })} />
                            </div>
                        </div>
                        <button type="submit" className={"button cyan-button"}>Edit</button>
                        <button className={"button red-button"} onClick={() => dispatch(removeEvent(id))}>Remove</button>
                        <button type="reset" className={"button silver-button"}>Reset</button>
                    </form>
                </div>
            </div>
        )
    }
    return <div className={"hidden"} />
}