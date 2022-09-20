import React, {FC, FormEvent, useEffect, useState} from "react";
import {SickLeave, SickLeaveInputType} from "../../types/sickLeave.types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";
import {createSickLeave, updateSickLeave, updateSickLeaveRequest} from "../../store/sickLeave/sickLeave.slice";
import {useAuth} from "../../hooks/useAuth";
import {ValidationFieldType, ValidationStateType} from "../../types/validation.types";

export enum SickLeaveFormActions {
    Create,
    Edit,
    EditRequest
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

const validationState: ValidationStateType = {
    fields: []
}

export const SickLeaveForm: FC<SickLeaveFormPropsType> = (props) => {

    const auth = useAuth()
    const dispatch = useDispatch()
    const {action, data, isVisible, setVisible} = props
    const [validation, setValidationState] = useState(validationState)
    const [state, setState] = useState(initialState)

    const validateFormFields = (): boolean => {
        let fields: ValidationFieldType[] = []

        if (!state.data.startDate || state.data.startDate.toString() === 'Invalid Date') {
            fields = [...fields, {name: 'startDate', validationMessage: `Field 'Start date' cannot be empty!`}]
        }

        if (!state.data.endDate || state.data.endDate.toString() === 'Invalid Date') {
            fields = [...fields, {name: 'endDate', validationMessage: `Field 'End date' cannot be empty!`}]
        } else {
            if (state.data.startDate && state.data.startDate.toString() !== 'Invalid Date') {
                if (state.data.startDate.getTime() > state.data.endDate.getTime()) {
                    fields = [...fields, {name: 'endDate', validationMessage: `End date cannot be less than start date!`}]
                }
            }
        }

        setValidationState({...validation, fields: fields})
        return fields.length === 0
    }

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

        if (validateFormFields()) {
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
                    case SickLeaveFormActions.EditRequest:
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
                            dispatch(updateSickLeaveRequest({sickLeave: sickLeave}))
                        }
                        break;
                }
            }
            setState(initialState)
            setVisible(false)
            document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
        }
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
                        <div className={'group-grid sick-leave-form-grid'}>
                            <div className={'form-item w-100 flex-wrap'}>
                                <label>Start date: </label>
                                <br/>
                                <input type={"date"}
                                       className={validation.fields.find(field => field.name === 'startDate') ? 'invalid' : ''}
                                       value={state.data.startDate ? convertDateToFormat(state.data.startDate) : ''}
                                       onChange={event => {
                                           setState({
                                               ...state,
                                               data: {
                                                   ...state.data,
                                                   startDate: convertDateStringToDate(event.target.value),
                                                   endDate: getMaxDate(new Date(), getMaxDate(convertDateStringToDate(event.target.value), state.data.endDate))
                                               }
                                           })
                                           setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'startDate')})
                                       }}
                                />
                                { validation.fields.find(field => field.name === 'startDate') &&
                                    validation.fields.filter(field => field.name === 'startDate').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                            <div className={'form-item w-100 flex-wrap'}>
                                <label>End date:</label>
                                <br/>
                                <input type={"date"}
                                       className={validation.fields.find(field => field.name === 'endDate') ? 'invalid' : ''}
                                       value={state.data.endDate ? convertDateToFormat(state.data.endDate) : ''}
                                       onChange={event => {
                                           setState({
                                               ...state,
                                               data: {
                                                   ...state.data,
                                                   endDate: convertDateStringToDate(event.target.value)
                                               }
                                           })
                                           setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'endDate')})
                                       }}
                                />
                                { validation.fields.find(field => field.name === 'endDate') &&
                                    validation.fields.filter(field => field.name === 'endDate').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
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