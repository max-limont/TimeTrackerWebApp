

import React from "react";
import moment from "moment";
import { idText } from "typescript";
import { Header } from "./Calendar/Header/Header";
import { Controls } from "./Calendar/Controls/Controls";
import { CalendarGrid } from "./Calendar/CalendarGrid/CalendarGrid";

function Calendar() {
    moment.updateLocale("en", { week: { dow: 1 } });
    const startDay = moment().startOf('month').startOf('week');
    

    return (
        <div className="calendar-container">
            <Header />
            <Controls todayMonth={moment().format("MMMM")} todayYear={moment().format("yyyy")}/>
            <CalendarGrid startDay={startDay}/>
        </div>
    )
}
export default Calendar;