import moment from "moment";
import { useState } from "react";

type DayObj = {
    date: string,
    isWeekend: boolean,
    isCurrentDay: boolean,
    event: any[]
};


export function Day(value: DayObj) {
    const [_Day, setDate] = useState(value.date);
    let currentDay = "";
    if (value.isCurrentDay)
        currentDay = "current-day";
    return (
        <>
            <div className="day" >
                <div className={"day-number "+currentDay}>{moment(_Day).format('DD')}</div>
            </div>
        </>

    )
}