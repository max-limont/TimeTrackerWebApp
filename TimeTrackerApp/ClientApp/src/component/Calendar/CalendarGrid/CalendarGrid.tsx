import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setCurrentDateList } from "../../../store/slice/calendar/calendarSlice";
import { ListEvents } from "../Events/ListEvents";
import { CreateEvent } from "../FormsCalendar/CreateEvent";


export function CalendarGrid() {
    const dispatch = useAppDispatch();

    const daysArray = useAppSelector((s) => s.rootReducer.calendar.currentDaysArray);
    const currentDate = useAppSelector((s) => s.rootReducer.calendar.currentDate);
    const currentCalendar = useAppSelector((s) => s.rootReducer.calendar.currentCalendar);

    const events = useAppSelector((s) => s.rootReducer.calendar.events);
    const [isSelectedFullList, setIsSelected] = useState(false);

    const days = ["Monday", "Thursday", 'Wednesday', 'Tuedsday', 'Friday', 'Saturday', 'Sunday'];
    let currentDay = " current-day";

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
            <div>
                {fullList()}
            </div>
            <div className="days">
                {days.map((dayItem, value) => {
                    return (
                        <div key={value}>{dayItem}</div>
                    );
                })}
            </div>
            <div className="calendar-grid">
                {daysArray.map((dayItem, value) => {
                    const formatDayItem = dayItem.format("yyyy-MM-DD");
                    const classNameCurrentDay = formatDayItem == currentDate ? currentDay : "";
                    const classNameMonth = !(dayItem.format("MM") == currentCalendar.format("MM")) ? "unselected-month" : "";
                    const classNameWeekend = dayItem.format("dd") == "Sa" || dayItem.format("dd") == "Su" ? "weekend" : "";

                    return (

                        <div key={value} className={"day " + classNameWeekend}>
                            <div className={"day-number " + classNameMonth}>
                                <p className={classNameCurrentDay}>{dayItem.format('DD')}
                                </p>
                            </div>
                            <div>
                                <div onClick={() => {
                                    setIsSelected(true);
                                    dispatch(setCurrentDateList(formatDayItem));
                                }} className="events">
                                    {events.filter(s => s.dateCreate == formatDayItem)
                                        .map(s =>
                                            <div className="event" key={s.id}>{s.title}</div>)}
                                </div>
                            </div>
                        </div>

                    );
                })}
            </div>
        </>

    );
}