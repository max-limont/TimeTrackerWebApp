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

    useEffect(()=>{
        dispatch(fetchAllEventsAction());
    },[]);

    useEffect(() => {
        dispatch(fetchRangeEventsAction({
            startDate: daysArray[0].format("yyyy-MM-DD"),
            finishDate: daysArray[totalDays - 1].format("yyyy-MM-DD")
        }));
    }, [events,daysArray]);

    function setEventDay(value: any,day?:EventType) {
        let styleDayName: any = null;
        styleDayName = value=="weekend"?"weekend":value == TypeDay.ShortDay?"short-day":value == TypeDay.Weekend?"weekend":null;
        if (styleDayName != null) 
            return (
                <>
                <div onClick={()=>{
                    if(day!=undefined){
                    setId(day?.id);
                    setEditFormVisible(true);
                    }
                    }} className={"events "+styleDayName} style={{ flexBasis: "100%" }}>
                    <div className="event ">{styleDayName}<p>{day?.title}</p>
                    <p>{day!=undefined?<FontAwesomeIcon icon={faCircleUser} className={"icon"} />:""}</p></div>
                </div>
                </>
            )    
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
                    const currentDayState = eventsRange.find(s => s.date == formatDayItem||(moment(formatDayItem).isSameOrBefore(s.endDate)&&moment(formatDayItem).isAfter(s.date)));
                  
                    if (currentDayState!=undefined) {
                        console.log(currentDayState);          
                            stateDay = currentDayState.typeDayId;
                    }

                    return (
                        <div key={value} className={"day "}>
                            <div className={"day-number " + classNameMonth}>
                                <p className={classNameCurrentDay}>{dayItem.format('DD')}
                                </p>
                            </div>
                            {setEventDay(stateDay,currentDayState)}
                        </div>
                    );
                })}
            </div>
        </div>
    </>
);
}