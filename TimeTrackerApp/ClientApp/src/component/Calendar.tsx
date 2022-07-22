

import React, { useState } from "react";
import moment from "moment";
import { idText } from "typescript";
import { Header } from "./Calendar/Header/Header";
import { Controls } from "./Calendar/Controls/Controls";
import { CalendarGrid } from "./Calendar/CalendarGrid/CalendarGrid";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { initCalendar } from "../store/slice/calendar/calendarSlice";

function Calendar() {
    const dispatch = useAppDispatch();
    dispatch(initCalendar());
    return (
        <div className="calendar-container">
            <Header />
            <Controls />
            <CalendarGrid/>
        </div>
    )
}
export default Calendar;