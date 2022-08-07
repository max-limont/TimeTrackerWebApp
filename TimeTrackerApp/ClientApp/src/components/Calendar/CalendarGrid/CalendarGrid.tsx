import { faCircleUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { TypeDay } from "../../../enums/TypeDay";
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
    },[]);

    useEffect(() => {
        dispatch(fetchRangeEventsAction({
            startDate: daysArray[0].format("yyyy-MM-DD"),
            finishDate: daysArray[totalDays - 1].format("yyyy-MM-DD")
        }));
    }, [events, daysArray]);

    function setEventDay(value: any, day: EventType[]) {
        let styleDayName: any = null;
        const newDays = day.filter(s=>s!=undefined);
        const eventsDay = newDays.map((s) => {
                value = s.typeDayId != null ? s.typeDayId : value;
                styleDayName = value == "weekend" ? "weekend" : value == TypeDay.ShortDay ? "short-day" : value == TypeDay.Weekend ? "weekend" : null;
                return (
             
                        <div key={s.id} onClick={() => {
                            setId(s.id);
                            setEditFormVisible(true);
                        }} className={"event " + styleDayName} style={{ minWidth: "85px" }}>
                            <p>{s.title}</p>
                            <p>{styleDayName}</p>
                            <p>{day != undefined ? <FontAwesomeIcon icon={faCircleUser} className={"icon"} /> : <></>}</p>
                        </div>
                    )});
        
        if (newDays.length==0) {
            if(value == "weekend")
                return (<div className={"event "} style={{ minWidth: "85px" }}>Weekend</div>);
        }
        return eventsDay;
    }


    return (
        <>
            
            <div key={1} className={"calendar"}>
            <EditEventForm visible={isEditFormVisible} setVisible={setEditFormVisible} id={id} />
                <div className="days">
                    {days.map((dayItem,i) => <div key={i}>{dayItem}</div>)}
                </div>
                <div className="calendar-grid">
                    {daysArray.map((dayItem, value) => {
                        const formatDayItem = dayItem.format("yyyy-MM-DD");
                        const classNameCurrentDay = formatDayItem == currentDate ? currentDay : "";
                        const classNameMonth = !(dayItem.format("MM") == currentCalendar.format("MM")) ? "unselected-month" : "";
                        /*проверяем выходной*/
                        let stateDay: any = dayItem.format("dd") == "Sa" || dayItem.format("dd") == "Su" ? "weekend" : '';
                        /*масив ивентов*/
                        const currentDayState = eventsRange.filter((s) => {
                            if (s.date == formatDayItem || (moment(formatDayItem).isSameOrBefore(s.endDate) && moment(formatDayItem).isAfter(s.date))) {
                                return s;
                            }
                        });

                        return (
                                <div key={value} className={"day "}>
                                    <div className={"day-number " + classNameMonth}>
                                        <p className={classNameCurrentDay}>{dayItem.format('DD')}
                                        </p>
                                    </div>
                                    <div  className="events" style={{ flexBasis: "100%" }}>
                                        {(stateDay==""||currentDayState.length>1)||stateDay=="weekend"?setEventDay(stateDay, currentDayState):<></>}
                                    </div>
                                </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}