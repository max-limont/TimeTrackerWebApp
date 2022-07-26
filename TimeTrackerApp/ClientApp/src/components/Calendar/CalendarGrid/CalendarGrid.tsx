import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {EditEventForm} from "../FormsCalendar/EditEventForm";


export function CalendarGrid() {
    const dispatch = useAppDispatch();

    const daysArray = useAppSelector((s) => s.rootReducer.calendar.currentDaysArray);
    const currentDate = useAppSelector((s) => s.rootReducer.calendar.currentDate);
    const currentCalendar = useAppSelector((s) => s.rootReducer.calendar.currentCalendar);

    const events = useAppSelector((s) => s.rootReducer.calendar.events);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [id, setId]= useState(0);
    const days = ["Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let currentDay = " current-day";


    return (
        <>
            <EditEventForm visible={isEditFormVisible} setVisible={setEditFormVisible} id={id} />
            <div className={"calendar"}>
                <div className="days">
                    {days.map((dayItem, value) => <div key={value}>{dayItem}</div>)}
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
                                    <div className="events">
                                        {events.filter(s => s.date === formatDayItem)
                                            .map(s => {
                                                return (
                                                <div className="event" key={s.id} onClick={() => {
                                                    setId(s.id)
                                                    setEditFormVisible(true);
                                                    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                                                }}>
                                                    {s.title}
                                                </div>);
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}