import React, { FC, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CreateEventObject } from "../../../type/Events/CreateEventType";
import moment from "moment";
import { addEvent } from "../../../store/slice/calendar/calendarSlice";
import { TypeDay } from "../../../enums/TypeDay";
import { addEventAction } from "../../../store/actions/calendar/calendarActions";

type CreateFormPropsType = {
    visible: boolean,
    setVisible: (visible: boolean) => void
}

export const CreateEventForm: FC<CreateFormPropsType> = (props) => {
    
    const dispatch = useAppDispatch();
    const events = useAppSelector(s => s.rootReducer.calendar.events);
    const [event, setEvent] = useState({ ...CreateEventObject, date: moment().format("yyyy-MM-DD") });
    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(event.date)
        dispatch(addEventAction({...event,date: event.date+"T00:00:00+00:00"}));
        setVisible(false);
        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
    }
    const { title, date ,typeDayId } = event;
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
                        <div className={"form-item w-100"}>
                            <label>Type Day</label>
                            <select onChange={(e)=>setEvent({ ...event, typeDayId: parseInt(e.target.value)==0?null: parseInt(e.target.value) })}>
                               <option value={0}></option>
                               <option value={TypeDay.ShortDay}>Скорочений день</option>
                               <option value={TypeDay.Weekend}>Вихідний</option>
                            </select>
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