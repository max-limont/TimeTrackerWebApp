import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeEventAction, updateEventAction } from "../../../store/actions/calendar/calendarActions";
import { TypeDay } from "../../../enums/TypeDay";
import Switch from "react-switch";

type EditFormPropsType = {
    id: number,
    visible: boolean,
    setVisible: (value: boolean) => void
}


export const EditEventForm: FC<EditFormPropsType> = (props) => {
    const dispatch = useAppDispatch();
    const { id, visible, setVisible } = props;
    const [rangeEventState, setRangeEventState] = useState(false);
    const event = useAppSelector(s => s.rootReducer.calendar.events).find(s => s.id == id);
    const [editEventFm, setEvent] = useState(event);
    useEffect(() => {
        if (editEventFm?.endDate != null) {
            setRangeEventState(true);
        }
        setEvent(event);
    }, [event]);

    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        const postFixDate = "T00:00:00+00:00";
       
        if (editEventFm != undefined) {
            if (rangeEventState == false) {
                setEvent({ ...editEventFm, endDate: null });
            }
            dispatch(updateEventAction({
                ...editEventFm,
                date: editEventFm.date + postFixDate,
                endDate: editEventFm.endDate == "" ? null : editEventFm.endDate + postFixDate
            }));
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
                                <input value={editEventFm.title} onChange={(e) => setEvent({ ...editEventFm, title: e.target.value })} />
                            </div>
                            <div className={"form-item w-100"}>
                                <label>Type Day</label>
                                <select value={editEventFm.typeDayId == null ? 0 : editEventFm?.title} onChange={(e) => setEvent({ ...editEventFm, typeDayId: parseInt(e.target.value) == 0 ? null : parseInt(e.target.value) })}>
                                    <option value={0}>Work Day</option>
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
                                <input type="date" value={editEventFm.date} onChange={(e) => setEvent({ ...editEventFm, date: e.target.value })} />
                            </div>
                            {rangeEventState == true ?
                                <div className={"form-item w-100"}>
                                    <label>End Date</label>
                                    <input type="date" value={editEventFm.endDate == null ? "" : editEventFm.endDate} onChange={(e) => setEvent({ ...editEventFm, endDate: e.target.value })} />
                                </div> : <></>}
                        </div>

                        <button type="submit" className={"button cyan-button"}>Edit</button>
                        <button className={"button red-button"} onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeEventAction(id))
                        }
                        }>Remove</button>
                        <button type="reset" className={"button silver-button"}>Reset</button>
                    </form>
                </div>
            </div>
        )
    }
    return <div className={"hidden"} />
}