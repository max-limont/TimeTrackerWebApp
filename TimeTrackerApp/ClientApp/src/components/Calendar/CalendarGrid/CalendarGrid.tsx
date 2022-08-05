import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchAllEventsAction, fetchRangeEventsAction } from "../../../store/actions/calendar/calendarActions";
import { EventType } from "../../../type/Events/EventType";
import { EditEventForm } from "../FormsCalendar/EditEventForm";


export function CalendarGrid() {

    const dispatch = useAppDispatch();
    const totalDays = useAppSelector(s => s.rootReducer.calendar.totalDays)
    const daysArray = useAppSelector((s) => s.rootReducer.calendar.currentDaysArray);
    const currentDate = useAppSelector((s) => s.rootReducer.calendar.currentDate);
    const currentCalendar = useAppSelector((s) => s.rootReducer.calendar.currentCalendar);
    const eventsRange = useAppSelector((s) => s.rootReducer.calendar.eventsRange);
    const events = useAppSelector((s) => s.rootReducer.calendar.events);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [id, setId] = useState(0);
    const days = ["Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const currentDay = " current-day";



    useEffect(() => {
        dispatch(fetchAllEventsAction());
        dispatch(fetchRangeEventsAction({
            startDate: daysArray[0].format("yyyy-MM-DD"),
            finishDate: daysArray[totalDays - 1].format("yyyy-MM-DD")
        }));
    }, [daysArray]);

    function setStateDay(value: any,day?:EventType) {
        let styleDayName: any = null;
        if (value == 2) {
            styleDayName = "short-day";
        }
        if (value == "weekend" || value == 1) {
            styleDayName = "weekend";
        }
        if (styleDayName != null) {
            return (
                <>
                <div onClick={()=>{
                    if(day!=undefined){
                    setId(day?.id);
                    setEditFormVisible(true);
                    }
                    }} className={"events "+styleDayName} style={{ flexBasis: "100%" }}>
                    <div className="event ">{styleDayName}<p>{day?.title}</p></div>
                </div>
                </>
            )
        }
    }

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
                    /*проверяем выходной*/
                    let stateDay: any = dayItem.format("dd") == "Sa" || dayItem.format("dd") == "Su" ? "weekend" : "";
                 
                    const currentDayState = events.find(s => s.date == formatDayItem);
                    if (currentDayState!=undefined) {
                        console.log(currentDayState);
                        if (stateDay == "") {
                            stateDay = currentDayState.typeDayId;
                        }
                    }

                    return (
                        <div key={value} className={"day "}>
                            <div className={"day-number " + classNameMonth}>
                                <p className={classNameCurrentDay}>{dayItem.format('DD')}
                                </p>
                            </div>
                            {setStateDay(stateDay,currentDayState)}
                        </div>
                    );
                })}
            </div>
        </div>
    </>
);
}