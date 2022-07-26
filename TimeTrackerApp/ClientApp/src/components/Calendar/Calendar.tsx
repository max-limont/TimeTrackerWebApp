import { Controls } from "../Calendar/Controls/Controls";
import { CalendarGrid } from "../Calendar/CalendarGrid/CalendarGrid";
import { useAppDispatch } from "../../app/hooks";
import { initCalendar } from "../../store/slice/calendar/calendarSlice";



function Calendar() {
    const dispatch = useAppDispatch();
    dispatch(initCalendar());
    return (
        <section className="calendar-container">
            <Controls />
            <CalendarGrid />
        </section>
    )
}
export default Calendar;