import { Component, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAllEventsAction } from "../../store/actions/calendar/calendarActions";
import Calendar from "./Calendar";




export function Layout() {

    return (
        <>
        <Calendar />
        </>
    )


}