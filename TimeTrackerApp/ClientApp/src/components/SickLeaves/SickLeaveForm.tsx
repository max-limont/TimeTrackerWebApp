import React, {FC, FormEvent, useEffect, useState} from "react";
import {SickLeave, SickLeaveInputType} from "../../types/sickLeave.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {createSickLeave, updateSickLeave} from "../../store/sickLeave/sickLeave.slice";
import {useAuth} from "../../hooks/useAuth";

export enum SickLeaveFormActions {
    Create,
    Edit
}

export type SickLeaveFormPropsType = {
    action: SickLeaveFormActions,
    isVisible: boolean,
    setVisible: (visible: boolean) => void,
    data?: SickLeave | null
}

export type SickLeaveFormDataType = {
    startDate?: Date | null,
    endDate?: Date | null,
}

export type SickLeaveFormStateType = {
    data: SickLeaveFormDataType
}

const initialState: SickLeaveFormStateType = {
    data: {}
}

export const SickLeaveForm: FC<SickLeaveFormPropsType> = (props) => {

    const auth = useAuth()
    const dispatch = useDispatch()
    const {action, data, isVisible, setVisible} = props
    const [state, setState] = useState(initialState)

    const convertDateToFormat = (date: Date): string => {
        const dateString = date.toLocaleDateString('sv')
        if (dateString === 'Invalid date')
            return ''
        const year = !dateString.split('-')[0] || dateString.split('-')[0] === '0' ? '0001' : dateString.split('-')[0].padStart(4, '0')
        const month = !dateString.split('-')[1] || dateString.split('-')[1] === '0' ? '01' : dateString.split('-')[1].padStart(2, '0')
        const day = !dateString.split('-')[2] || dateString.split('-')[2] === '0' ? '01' : dateString.split('-')[2].padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const convertDateStringToDate = (dateString: string): Date | null => dateString.trim() === '' ? null : new Date(dateString)

    const getMaxDate = (dateA?: Date | null, dateB?: Date | null) => {
        if (!dateA || dateA.toString() === 'Invalid date')
            return dateB
        if (!dateB || dateB.toString() === 'Invalid date')
            return dateA
        return dateA.getTime() >= dateB.getTime() ? dateA : dateB
    }
    const getMinDate = (dateA?: Date | null, dateB?: Date | null) => {
        if (!dateA || dateA.toString() === 'Invalid date')
            return dateB
        if (!dateB || dateB.toString() === 'Invalid date')
            return dateA
        return dateA.getTime() < dateB.getTime() ? dateA : dateB
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()

        if (getMaxDate(state.data.endDate, state.data.startDate) === state.data.startDate)
            return;

        if (auth.state?.user) {
            switch (action) {
                case SickLeaveFormActions.Create:
                    if (state.data.startDate && state.data.endDate) {
                        const sickLeave: SickLeaveInputType = {
                            startDate: state.data.startDate,
                            endDate: state.data.endDate,
                            employeeId: auth.state?.user?.id
                        }
                        dispatch(createSickLeave({sickLeave: sickLeave}))
                    }
                    break;
                case SickLeaveFormActions.Edit:
                    if (data && state.data.startDate && state.data.endDate) {
                        const sickLeave: SickLeaveInputType = {
                            id: data.id,
                            startDate: state.data.startDate,
                            endDate: state.data.endDate,
                            creationDateTime: data.creationDateTime,
                            approverId: data.approverId,
                            employeeId: data.employeeId,
                            status: data.status
                        }
                        dispatch(updateSickLeave({sickLeave: sickLeave}))
                    }
                    break;
            }
        }
        setState(initialState)
        setVisible(false)
        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
    }

    useEffect(() => {
        if (data) {
            setState({...state, data: {startDate: data!.startDate, endDate: data!.endDate}})
        }
    }, [data])

    return (
        <div className={`sick-leave-form-container dark-background ${!isVisible ? 'hidden' : ''}`}>
            <div className={'sick-leave-form'}>
                <div className={'form-header'}>
                    <h2>{SickLeaveFormActions[action]} sick leave</h2>
                    <a className={"button red-button close"} onClick={() => {
                        setState({...initialState, data: data ? data : {}})
                        setVisible(false)
                        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
                    }}>
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </a>
                </div>
                <form onSubmit={event => submit(event)}>
                    <div className={'form-group flex-wrap'}>
                        <div className={'form-item w-100 flex-wrap'}>
                            <label>Start date: </label>
                            <br/>
                            <input type={"date"}
                                   value={state.data.startDate ? convertDateToFormat(state.data.startDate) : ''}
                                   onChange={event => setState({
                                       ...state,
                                       data: {
                                           ...state.data,
                                           startDate: convertDateStringToDate(event.target.value),
                                           endDate: getMaxDate(new Date(), getMaxDate(convertDateStringToDate(event.target.value), state.data.endDate))
                                       }
                                   })}
                            />
                        </div>
                        <div className={'form-item w-100 flex-wrap'}>
                            <label>End date:</label>
                            <br/>
                            <input type={"date"}
                                   value={state.data.endDate ? convertDateToFormat(state.data.endDate) : ''}
                                   onChange={event => setState({
                                       ...state,
                                       data: {
                                           ...state.data,
                                           endDate: convertDateStringToDate(event.target.value)
                                       }
                                   })}
                            />
                        </div>
                        <div className={'form-group buttons'}>
                            <button className={`button ${action === SickLeaveFormActions.Create ? 'green-button' : 'yellow-button'} submit-sick-form-button`}>
                                {action === SickLeaveFormActions.Create ? 'Create' : 'Edit'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}