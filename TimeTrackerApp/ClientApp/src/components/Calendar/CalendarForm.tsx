import React, {FC, FormEvent, useState} from "react";
import {CalendarTypes, CreateCalendarDayType, DayTypes} from "../../types/calendar.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import {useDispatch} from "react-redux";
import {createCalendarDay, editCalendarDay, removeCalendarDay} from "../../store/calendar/calendar.slice";
import {ValidationFieldType, ValidationStateType} from "../../types/validation.types";

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

const validationState: ValidationStateType = {
    fields: []
}

export const CalendarForm: FC<CalendarFormPropsType> = (props) => {

    const dispatch = useDispatch()
    const {isVisible, data, status, setVisible} = props
    const [state, setState] = useState({...initialState, data: data, isDailyRange: !!data?.endDate})
    const [validation, setValidationState] = useState(validationState)

    const convertDateToFormat = (date: Date): string => date.toString() !== 'Invalid Date' && date.toLocaleDateString('sv')[0] !== '+' ? date.toLocaleDateString('sv').slice(0, 10) : ''

    const validateFormFields = (): boolean => {
        let fields: ValidationFieldType[] = []
        if (state.data?.title?.trim() === '' || !state.data?.title) {
            fields = [...fields, {name: 'title', validationMessage: 'The name of note is empty!'}]
        }
        if (!state.data?.date || state.data?.date.toString() === 'Invalid Date') {
            fields = [...fields, {name: 'date', validationMessage: 'No date is specified!'}]
        }
        if (state.isDailyRange) {
            if (!state.data?.endDate || state.data?.endDate?.toString() === 'Invalid Date') {
                fields = [...fields, {name: 'endDate', validationMessage: 'No end date of range is specified!'}]
            } else if (state.data.date.getTime() > state.data.endDate.getTime()) {
                fields = [...fields, {name: 'endDate', validationMessage: 'End date cannot be less than start date!'}]
            }
        }
        setValidationState({...validation, fields: fields})
        return fields.length === 0
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (validateFormFields()) {
            switch (status) {
                case CalendarFormStatus.Create:
                    const createdCalendarDay: CreateCalendarDayType = {
                        title: state.data!.title,
                        date: new Date(state.data!.date + " UTC"),
                        endDate: new Date(state.data!.endDate + " UTC"),
                        dayTypeId: state.data!.dayTypeId ?? DayTypes.Weekend.valueOf()
                    }
                    dispatch(createCalendarDay(createdCalendarDay))
                    break;
                case CalendarFormStatus.Edit:
                    const editedCalendarDay: CalendarTypes = {
                        id: state.data!.id,
                        title: state.data!.title,
                        date: new Date(state.data!.date + " UTC"),
                        endDate: new Date(state.data!.endDate + " UTC"),
                        dayTypeId: state.data!.dayTypeId
                    }
                    dispatch(editCalendarDay(editedCalendarDay))
                    break;
            }
            setState({...state, data: null})
            setVisible(false)
            document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
        }
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
                        <div className={"form-item switch w-100"}>
                            <label htmlFor={"day-range"}>Set this note for the range of days</label>
                            <Switch id={"day-range"} width={40} height={18} handleDiameter={18} onChange={() => setState({...state, isDailyRange: !state.isDailyRange, data: {...state.data, endDate: !state.isDailyRange ? new Date() : data?.endDate} as CalendarTypes})} checked={state.isDailyRange} checkedIcon={false} uncheckedIcon={false} />
                        </div>
                        <div className={"group-grid"}>
                            <div className={"form-item flex-wrap w-100"}>
                                <label>Name</label>
                                <input className={validation.fields.find(field => field.name === 'title') ? 'invalid' : ''} value={state.data?.title ?? ''} onChange={event => {
                                    setState({...state, data: {...state.data, title: event.target.value} as CalendarTypes})
                                    setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'title')})
                                }} placeholder={'Weekend'}/>
                                { validation.fields.find(field => field.name === 'title') &&
                                    validation.fields.filter(field => field.name === 'title').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                            <div className={"form-item flex-wrap w-100"}>
                                <label>Day type</label>
                                <select value={state.data?.dayTypeId ? state.data.dayTypeId : 0} onChange={event => setState({...state, data: {...state.data, dayTypeId: parseInt(event.target.value)} as CalendarTypes})}>
                                    <option value={DayTypes.Weekend.valueOf()}>Day off</option>
                                    <option value={DayTypes.ShortDay.valueOf()}>Short Day</option>
                                </select>
                            </div>
                            <div className={"form-item flex-wrap w-100"}>
                                <label>Date</label>
                                <input className={validation.fields.find(field => field.name === 'date') ? 'invalid' : ''} type={"date"} defaultValue={convertDateToFormat(state.data?.date ?? new Date())} onChange={event => {
                                    setState({...state, data: {...state.data, date: new Date(event.target.value)} as CalendarTypes})
                                    setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'date')})
                                }} />
                                { validation.fields.find(field => field.name === 'date') &&
                                    validation.fields.filter(field => field.name === 'date').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                            { state.isDailyRange &&
                                <div className={"form-item flex-wrap w-100"}>
                                    <label>Last date in range</label>
                                    <input className={validation.fields.find(field => field.name === 'endDate') ? 'invalid' : ''} type={"date"} defaultValue={convertDateToFormat(state.data?.endDate ?? new Date())} onChange={event => {
                                        setState({...state, data: {...state.data, endDate: new Date(event.target.value)} as CalendarTypes})
                                        setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'endDate')})
                                    }} />
                                    { validation.fields.find(field => field.name === 'endDate') &&
                                        validation.fields.filter(field => field.name === 'endDate').map((field, index) => (
                                            <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                        ))
                                    }
                                </div>
                            }
                        </div>
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