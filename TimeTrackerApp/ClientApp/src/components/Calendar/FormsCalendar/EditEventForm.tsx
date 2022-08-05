import React, {FC, useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import { removeEventAction, updateEventAction } from "../../../store/actions/calendar/calendarActions";

type EditFormPropsType = {
    id: number,
    visible: boolean,
    setVisible: (value: boolean) => void
}


export const EditEventForm: FC<EditFormPropsType> = (props) => {
    const dispatch = useAppDispatch();
    const { id, visible, setVisible} = props;
    const event = useAppSelector(s => s.rootReducer.calendar.events).find(s => s.id == id);
    const [editEventFm, setEvent] = useState(event);

    useEffect(() => {
        setEvent(event)
    }, [event]);

    const onFinish=(e: React.FormEvent)=>{
        e.preventDefault();
        if(editEventFm != undefined)
        {
            dispatch(updateEventAction(editEventFm));
        }
        setVisible(false);
    };

    if (editEventFm) {
        return (
            <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
                <div className={"form-event"}>
                    <div className={"form-header"}>
                        <h2>Edit event</h2>
                        <button className={"button red-button close"} onClick={() => {
                            setVisible(false);
                            }}>
                            <FontAwesomeIcon icon={faXmark} className={"icon"} />
                        </button>
                    </div>
                    <form onSubmit={(e) => onFinish(e)}>
                        <div className={"form-group"}>
                            <div className={"form-item w-100"}>
                                <label>Name</label>
                                <input value={editEventFm?.title} onChange={(e) => setEvent({ ...editEventFm, title: e.target.value })} />
                            </div>
                            <div className={"form-item w-100"}>
                                <label>Date</label>
                                <input type="date" value={editEventFm?.date} onChange={(e) => setEvent({ ...editEventFm, date: e.target.value })} />
                            </div>
                        </div>
                        <button type="submit" className={"button cyan-button"}>Edit</button>
                        <button className={"button red-button"} onClick={() => 
                            dispatch(removeEventAction(id))
                            }>Remove</button>
                        <button type="reset" className={"button silver-button"}>Reset</button>
                    </form>
                </div>
            </div>
        )
    }
    return <div className={"hidden"} />
}