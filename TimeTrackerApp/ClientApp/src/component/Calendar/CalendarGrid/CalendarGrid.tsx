import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ShortListEvents } from "../Events/ShortListEvents";
import { CreateEvent } from "../FormsCalendar/CreateEvent";


export function CalendarGrid() {
    const [events, setEvents] = useState(useAppSelector((s) => s.rootReducer.calendar.events));

    const daysArray = useAppSelector((s) => s.rootReducer.calendar.currentDaysArray);
    const days = ["Monday", "Thursday", 'Wednesday', 'Tuedsday', 'Friday', 'Saturday', 'Sunday'];
    const currentDate = useAppSelector((s) => s.rootReducer.calendar.currentDate);
    const currentCalendar = useAppSelector((s) => s.rootReducer.calendar.currentCalendar);

    let currentDay = " current-day";
    useEffect(() => {

    });

    return (
        <>
           
            <div className="days" >

                {days.map((dayItem, value) => {
                    return (
                        <div key={value}>{dayItem}</div>
                    );
                })}
            </div>
            <div className="calendar-grid">
                {daysArray.map((dayItem, value) => {
 
                    const classNameCurrentDay = dayItem.format("yyyy-MM-DD") == currentDate ? currentDay : "";
                    const classNameMonth = !(dayItem.format("MM") == currentCalendar.format("MM")) ? "unselected-month" : "";
                    const classNameWeekend = dayItem.format("dd") == "Sa" || dayItem.format("dd") == "Su" ? "weekend" : "";

                    return (
                        <>
                            <div key={value} className={"day " + classNameWeekend}>
                                <div  className={"day-number " + classNameMonth}>
                                    <p className={classNameCurrentDay}>{dayItem.format('DD')}
                                    </p>
                                </div>
                                <div >
                                    
                                <ShortListEvents date={dayItem.format("yyyy-MM-DD")}/>
                                </div>
                            </div>
                            </>
                    );
                })}
            </div>
        </>

    );
}