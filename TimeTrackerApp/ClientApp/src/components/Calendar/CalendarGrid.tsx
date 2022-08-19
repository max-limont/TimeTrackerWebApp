import {useEffect, useState} from "react";
import {CalendarTypes, DayTypes} from "../../types/calendar.types";
import {useAuth} from "../../hooks/useAuth";
import {Controls} from "./Controls";
import {compareDate, fetchAllCalendarDays} from "../../store/calendar/calendar.slice";
import {CalendarForm, CalendarFormStatus} from "./CalendarForm";
import {ContentStateType} from "../Layout/Content";
import {Loading} from "../Layout/Loading";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";

export type CalendarStateType = {
    isCalendarFormVisible: boolean,
    data?: CalendarTypes | null,
    calendarFormStatus: CalendarFormStatus,
    contentState: ContentStateType
}

const initialState: CalendarStateType = {
    isCalendarFormVisible: false,
    data: null,
    calendarFormStatus: CalendarFormStatus.Create,
    contentState: { showContent: false }
}

export function CalendarGrid() {

    const auth = useAuth()
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch();
    const days = useAppSelector(state => state.rootReducer.calendar.days)
    const selectedMonth = useAppSelector(state => state.rootReducer.calendar.selectedMonth)
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    const getDayDataItemClassName = (data: CalendarTypes) => {
        switch (data.dayTypeId) {
            case DayTypes.Weekend.valueOf():
                return 'day-off'
            case DayTypes.ShortDay.valueOf():
                return 'short-day'
            default:
                return 'default'
        }
    }

    const updateDay = (data: CalendarTypes | null, calendarFormStatus: CalendarFormStatus) => {
        setState({...state, data: data, isCalendarFormVisible: true, calendarFormStatus: calendarFormStatus})
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }

    useEffect(() => {
        setState({...state, contentState: { showContent: false }})
        if (auth.state?.isUserAuthenticated) {
            /*
            dispatch(fetchCalendarDaysRange({
                startDate: new Date(new Date(structuredClone(selectedMonth).setHours(0, 0, 0, 0)) + " UTC"),
                finishDate: new Date(new Date(new Date(structuredClone(selectedMonth).setMonth(selectedMonth.getMonth() + 1, 0)).setHours(0, 0, 0, 0)) + " UTC")
            }));*/
            dispatch(fetchAllCalendarDays())
            setState({...state, contentState: { showContent: true }})
        }
    }, [auth, selectedMonth])

    return state.contentState.showContent ? (
        <>
            {state.isCalendarFormVisible &&
                <CalendarForm data={state.data} isVisible={state.isCalendarFormVisible} setVisible={(isVisible: boolean) => setState({...state, isCalendarFormVisible: isVisible})} status={state.calendarFormStatus} />
            }
            <div className={'calendar'}>
                <Controls />
                <div className={'days'}>
                    {
                        weekdays.map((weekday, key) => (
                            <div key={key}>{weekday}</div>
                        ))
                    }
                </div>
                <div className={'calendar-grid'}>
                    {
                        days.map((day, key) => (
                            <div key={key} className={`day ${day.date.getMonth() !== selectedMonth.getMonth() ? 'disabled ' : ''}${day.data.length === 0 ? 'empty' : ''}`} onClick={event => {
                                if (event.target instanceof Element) {
                                    const element: Element = event.target
                                    const dayDataItem = element.closest('.day-data-item')
                                    return !dayDataItem ? updateDay({ date: structuredClone(day.date) } as CalendarTypes, CalendarFormStatus.Create) : undefined;
                                }
                            }}>
                                <div className={`day-number ${compareDate(day.date, new Date()) ? 'current-day' : ''}`}>
                                    <p>{day.date.getDate().toString().padStart(2, '0')}</p>
                                </div>
                                <div className="day-data">
                                    {
                                        day.data.map((data, dataKey) => (
                                            <div key={dataKey} className={`day-data-item ${getDayDataItemClassName(data)}`} onClick={() => data.id ? updateDay(data, CalendarFormStatus.Edit) : undefined}>
                                                <p>{data.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    ) : (
        <Loading />
    )
}