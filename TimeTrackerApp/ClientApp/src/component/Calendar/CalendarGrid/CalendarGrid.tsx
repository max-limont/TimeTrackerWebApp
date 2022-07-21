import moment from "moment";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";

type Obj = {
    array: moment.Moment[]
}

export function CalendarGrid() {
    const daysArray = useAppSelector((s) => s.rootReducer.calendar.currentDaysArray)
    const days = ["Monday", "Thursday", 'Wednesday', 'Tuedsday', 'Friday', 'Saturday', 'Sunday'];
    const currentDate = useAppSelector((s) => s.rootReducer.calendar.currentDate);
    const currentCalendar = useAppSelector((s) => s.rootReducer.calendar.currentCalendar);
    let currentDay = " current-day";

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
                    const className = dayItem.format("yyyy-MM-DD") == currentDate ? currentDay : "";
                    const classNameMonth = !(dayItem.format("MM") == currentCalendar.format("MM")) ? "unselected-month" : "";
                    const classNameWeekend = dayItem.format("dd") == "Sa" || dayItem.format("dd") == "Su" ? "weekend" : "";
                
                    return (
                        <div key={value} className={"day " + classNameWeekend} >
                            <div className={"day-number " + className + classNameMonth}>{dayItem.format('DD')}</div>
                        </div>
                    );
                })}
            </div>
        </>

    );
}