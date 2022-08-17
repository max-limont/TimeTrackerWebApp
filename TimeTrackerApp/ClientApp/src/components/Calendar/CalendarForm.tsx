import React, {FC, FormEvent, useState} from "react";
import {CalendarTypes, CreateCalendarDayType, DayTypes} from "../../types/calendar.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import {useDispatch} from "react-redux";
import {createCalendarDay, editCalendarDay, removeCalendarDay} from "../../store/calendar/calendar.slice";

export enum CalendarFormStatus {
    Create,
    Edit
}

export type CalendarFormPropsType = {
    isVisible: boolean,
    setVisible: (visible: boolean) => void,
    status: CalendarFormStatus,
    data?: CalendarTypes | null
}

export type CalendarFormStateType = {
    isDailyRange: boolean,
    data?: CalendarTypes | null
}

const initialState: CalendarFormStateType = {
    isDailyRange: false,
    data: null
}

export const CalendarForm: FC<CalendarFormPropsType> = (props) => {

    const dispatch = useDispatch()
    const {isVisible, data, status, setVisible} = props
    const [state, setState] = useState({...initialState, data: data, isDailyRange: !!data?.endDate})

    const convertDateToFormat = (date: Date): string => date.toString() !== 'Invalid Date' && date.toLocaleDateString('sv')[0] !== '+' ? date.toLocaleDateString('sv').slice(0, 10) : ''

    const submit = (event: FormEvent) => {
        event.preventDefault()
        switch (status) {
            case CalendarFormStatus.Create:
                if (state.data?.title && state.data?.date) {
                    const calendarDay: CreateCalendarDayType = {
                        title: state.data.title,
                        date: new Date(state.data.date + " UTC"),
                        endDate: new Date(state.data.endDate + " UTC"),
                        dayTypeId: state.data.dayTypeId ?? DayTypes.Weekend.valueOf()
                    }
                    dispatch(createCalendarDay(calendarDay))
                }
                break;
            case CalendarFormStatus.Edit:
                if (state.data?.id && state.data.title && state.data.date && state.data.dayTypeId) {
                    const calendarDay: CalendarTypes = {
                        id: state.data.id,
                        title: state.data.title,
                        date: new Date(state.data.date + " UTC"),
                        endDate: new Date(state.data.endDate + " UTC"),
                        dayTypeId: state.data.dayTypeId
                    }
                    dispatch(editCalendarDay(calendarDay))
                }
                break;
        }
        setState({...state, data: null})
        setVisible(false)
        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
    }

    return (
        <div className={`calendar-form-container dark-background ${!isVisible && "hidden"}`}>
            <div className={'calendar-form'}>
                <div className={'form-header'}>
                    <h2>{CalendarFormStatus[status].toString()} note</h2>
                    <a className={"button red-button close"} onClick={() => {
                        setVisible(false)
                        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
                    }}>
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </a>
                </div>
                <form onSubmit={event => submit(event)}>
                    <div className={"form-group"}>
                        <div className={"form-item w-100"}>
                            <label>Name</label>
                            <input value={state.data?.title ?? ''} onChange={event => setState({...state, data: {...state.data, title: event.target.value} as CalendarTypes})} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Day type</label>
                            <select value={state.data?.dayTypeId ? state.data.dayTypeId : 0} onChange={event => setState({...state, data: {...state.data, dayTypeId: parseInt(event.target.value)} as CalendarTypes})}>
                                <option value={DayTypes.Weekend.valueOf()}>Day off</option>
                                <option value={DayTypes.ShortDay.valueOf()}>Short Day</option>
                            </select>
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Is the daily range</label>
                            <Switch width={40} height={18} handleDiameter={18} onChange={() => setState({...state, isDailyRange: !state.isDailyRange, data: {...state.data, endDate: !state.isDailyRange ? new Date() : data?.endDate} as CalendarTypes})} checked={state.isDailyRange} checkedIcon={false} uncheckedIcon={false} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Date</label>
                            <input type={"date"} defaultValue={convertDateToFormat(state.data?.date ?? new Date())} onChange={event => setState({...state, data: {...state.data, date: new Date(event.target.value)} as CalendarTypes})} />
                        </div>
                        { state.isDailyRange &&
                            <div className={"form-item w-100"}>
                                <label>Last date in range</label>
                                <input type={"date"} defaultValue={convertDateToFormat(state.data?.endDate ?? new Date())} onChange={event => setState({...state, data: {...state.data, endDate: new Date(event.target.value)} as CalendarTypes})} />
                            </div>
                        }
                    </div>
                    { status === CalendarFormStatus.Edit ?
                        <>
                            <button type={"submit"} className={"button cyan-button"}>Edit</button>
                            <button className={"button red-button"} onClick={event => {
                                event.preventDefault()
                                dispatch(removeCalendarDay(state.data?.id ?? 0))
                                setVisible(false)
                                document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
                            }}>
                                Remove
                            </button>
                        </>
                        :
                        <button type={"submit"} className={'button cyan-button'}>Create</button>
                    }
                    <button type={"reset"} className={"button yellow-button"}>Reset</button>
                </form>
            </div>
        </div>
    )
}