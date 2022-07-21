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
                  const className = dayItem.format("yyyy-MM-DD")==currentDate?currentDay:"";
                    return (
                        <div key={value} className="day" >
                            <div className={"day-number " + className}>{dayItem.format('DD')}</div>
                        </div>
                    );
                })}
            </div>
        </>

    );
}