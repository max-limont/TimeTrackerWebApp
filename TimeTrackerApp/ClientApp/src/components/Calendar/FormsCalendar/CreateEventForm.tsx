import React, { FC, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CreateEventObject } from "../../../type/Events/CreateEventType";
import moment from "moment";
import Switch from "react-switch";
import { TypeDay } from "../../../enums/TypeDay";
import { addEventAction } from "../../../store/actions/calendar/calendarActions";

type CreateFormPropsType = {
    visible: boolean,
    setVisible: (visible: boolean) => void
}

export const CreateEventForm: FC<CreateFormPropsType> = (props) => {

    const dispatch = useAppDispatch();
    const [event, setEvent] = useState({ ...CreateEventObject, typeDayId: TypeDay.ShortDay, date: moment().format("yyyy-MM-DD") });
    const [errorForm, setErrorForm] = useState("");
    const [rangeEventState, setRangeEventState] = useState(false);
    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        const checkDates = !(moment(event.date).isSameOrAfter(event.endDate))
        if (checkDates) {
            const postFixDate = "T00:00:00+00:00";
            dispatch(addEventAction({
                ...event,
                date: event.date + postFixDate,
                endDate: event.endDate == "" || event.endDate == null ? null : event.endDate + postFixDate
            }));
            setVisible(false);
            document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
        }
        if (!checkDates) {
            setErrorForm("Date Errors");
        }

    }

    const { title, date, typeDayId, endDate } = event;
    const { visible, setVisible } = props;


    return (
        <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
            <div className={"form-event"}>
                <div className={"form-header"}>

                    <h2>Create event</h2>
                    <div style={{ color: "red" }}>{errorForm}</div>
                    <button className={"button red-button close"} onClick={() => {
                        setVisible(false)
                        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
                    }}>
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </button>
                </div>
                <form onSubmit={(e) => onFinish(e)} onChange={() => { setErrorForm("") }}>
                    <div className={"form-group"}>
                        <div className={"form-item w-100"}>
                            <label>Name</label>
                            <input value={title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Type Day</label>
                            <select onChange={(e) => setEvent({ ...event, typeDayId: parseInt(e.target.value) })}>
                                <option value={TypeDay.ShortDay}>Short Day</option>
                                <option value={TypeDay.Weekend}>Weekend</option>
                            </select>
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Range Date Event</label>
                            <Switch onChange={() => setRangeEventState(!rangeEventState)} checked={rangeEventState} checkedIcon={false} uncheckedIcon={false} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Date</label>
                            <input type="date" value={date} onChange={(e) => setEvent({ ...event, date: e.target.value })} />
                        </div>
                        {rangeEventState == true ?
                            <div className={"form-item w-100"}>
                                <label>End Date</label>
                                <input type="date" value={endDate == null ? "" : endDate} onChange={(e) => setEvent({ ...event, endDate: e.target.value })} />
                            </div> : <></>}
                    </div>
                    <button type="submit" className={"button cyan-button"}>Add</button>
                    <button type="reset" className={"button red-button"}>Reset</button>
                </form>
            </div>
        </div>
    );
}