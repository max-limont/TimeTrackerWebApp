import React, {FC, useState} from "react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {CreateEventObject} from "../../../type/Events/CreateEventType";
import moment from "moment";
import {addEvent} from "../../../store/slice/calendar/calendarSlice";

type CreateFormPropsType = {
    visible: boolean,
    setVisible: (visible: boolean) => void
}

export const CreateEventForm: FC<CreateFormPropsType> = (props) => {

    const dispatch = useAppDispatch();
    const events = useAppSelector(s => s.rootReducer.calendar.events);
    const id = events && events.length > 0 ? events[events.length - 1].id + 1 : 1;
    const [event, setEvent] = useState({ ...CreateEventObject, date: moment().format("yyyy-MM-DD") });
    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addEvent({
            ...event,
            id: id
        }));
        setVisible(false);
        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
    }
    const { title, description, date } = event;
    const { visible, setVisible } = props;


    return (
        <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
            <div className={"form-event"}>
                <div className={"form-header"}>
                    <h2>Create event</h2>
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
                            <input value={title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
                        </div>
                        <div className={"form-item align-items-start w-100"}>
                            <label>Description</label>
                            <textarea value={description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Date</label>
                            <input type="date" value={date} onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                        </div>
                    </div>
                    <button type="submit" className={"button cyan-button"}>Add</button>
                    <button type="reset" className={"button red-button"}>Reset</button>
                </form>
            </div>
        </div>
    );
}