import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { initCalendar, nextMonth, prevMonth } from "../../../store/slice/calendar/calendarSlice";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CreateEventForm } from "../FormsCalendar/CreateEventForm";


export function Controls() {
    const dispatch = useAppDispatch();
    const [isCreateFormVisible, setCreateFormVisible] = useState(false);
    const month = useAppSelector((s) => s.rootReducer.calendar.currentCalendar).format("MMMM");
    const year = useAppSelector((s) => s.rootReducer.calendar.currentCalendar).format("yyyy");

    return (
        <>
            <CreateEventForm visible={isCreateFormVisible} setVisible={setCreateFormVisible}/>
            <div className="calendar-controls">
                <header>
                    <div>
                        <h2>{month}<span>{year}</span></h2>
                    </div>
                    <div className="control-panel">
                        <button className={"button cyan-button"} onClick={() => {
                            setCreateFormVisible(true)
                            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                        }}>
                            Add Event
                        </button>
                        <button className={"button cyan-button"} onClick={() => dispatch(prevMonth())}>
                            <FontAwesomeIcon icon={faAngleLeft} className={"icon"} />
                        </button>
                        <button className={"button cyan-button"} onClick={() => dispatch(initCalendar())}>Today</button>
                        <button className={"button cyan-button"} onClick={() => dispatch(nextMonth())}>
                            <FontAwesomeIcon icon={faAngleRight} className={"icon"} />
                        </button>
                    </div>
                </header>
            </div >
        </>);
}