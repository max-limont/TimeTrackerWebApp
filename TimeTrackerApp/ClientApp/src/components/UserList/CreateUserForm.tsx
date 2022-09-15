import React, {FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {User, UserInputType, UserPrivileges} from "../../types/user.types";
import Switch from "react-switch";
import {createUserAction} from "../../store/userList/userList.slice";
import {getUserByEmail, parseObjectToUser} from "../../store/user/user.slice";

type ValidationFieldType = {
    name: string,
    validationMessage: string
}

type ValidationStateType = {
    fields: ValidationFieldType[]
}

const initialState: UserInputType = {
    email: '',
    password: '',
    passwordConfirmation: '',
    firstName: '',
    lastName: '',
    isFullTimeEmployee: true,
    weeklyWorkingTime: 100,
    remainingVacationDays: 30,
    privilegesValue: 0
}

const validationState: ValidationStateType = {
    fields: []
}

export const CreateUserForm = () => {
    const userWithEmail = useAppSelector(state => state.rootReducer.user.user)
    const [user, setUser] = useState(initialState)
    const [validation, setValidationState] = useState(validationState)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setUser({...user, weeklyWorkingTime: user.isFullTimeEmployee ? initialState.weeklyWorkingTime : initialState.weeklyWorkingTime / 2})
    }, [user.isFullTimeEmployee])

    const validateFormFields = (): boolean => {
        let fields: ValidationFieldType[] = []
        if (user.email.trim() === '') {
            fields = [...fields, {name: 'email', validationMessage: 'No email address is specified!'}]
        } else if (!user.email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)) {
            fields = [...fields, {name: 'email', validationMessage: 'Incorrect email address!'}]
        } else if (userWithEmail) {
            console.log(1)
            fields = [...fields, {name: 'email', validationMessage: 'User with such email already exists!'}]
        }
        if (user.password.length < 1) {
            fields = [...fields, {name: 'password', validationMessage: 'The length of the password cannot be less than 1 characters!'}]
        } else if (!user.password.match(/[A-Za-z0-9!@#$%^&*()_\-+=]{1,}/)) {
            fields = [...fields, {name: 'password', validationMessage: 'The password must contain only latin letters, digits and characters: !@#$%^&*()_-+=!'}]
        }
        if (user.password !== user.passwordConfirmation) {
            fields = [...fields, {name: 'passwordConfirmation', validationMessage: 'Passwords are different!'}]
        }
        if (user.firstName.trim() === '') {
            fields = [...fields, {name: 'firstName', validationMessage: "User's first name is empty!"}]
        }
        if (user.lastName.trim() === '') {
            fields = [...fields, {name: 'lastName', validationMessage: "User's last name is empty!"}]
        }
        setValidationState({...validation, fields: fields})
        return fields.length === 0
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()
        dispatch(getUserByEmail({email: user.email}))
        if (validateFormFields()) {
            dispatch(createUserAction({...parseObjectToUser(user), password: user.password}))
            navigate('/user-list', {replace: true})
        }
    }

    return (
        <div className={"flex-container flex-column w-100"}>
            <div className={"create-user-form"}>
                <div className={"form-header"}>
                    <h2>Create user</h2>
                </div>
                <form onSubmit={event => submit(event)}>
                    <div className={"form-group credentials-group"}>
                        <div className={'group-header'}>
                            <h4>Credentials</h4>
                        </div>
                        <div className={'group-grid'}>
                            <div className={"form-item flex-wrap email"}>
                                <input
                                    className={validation.fields.find(field => field.name === 'email') ? 'invalid' : ''}
                                    placeholder={'Email'}
                                    value={user.email}
                                    onChange={event => {
                                        setUser({...user, email: event.target.value})
                                        setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'email')})
                                    }}
                                    type={"email"} />
                                { validation.fields.find(field => field.name === 'email') &&
                                    validation.fields.filter(field => field.name === 'email').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                            <div className={"form-item flex-wrap password"}>
                                <input
                                    className={validation.fields.find(field => field.name === 'password') ? 'invalid' : ''}
                                    placeholder={'Password'}
                                    value={user.password}
                                    onChange={event => {
                                        setUser({...user, password: event.target.value})
                                        setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'password')})
                                    }}
                                    type={"password"} />
                                { validation.fields.find(field => field.name === 'password') &&
                                    validation.fields.filter(field => field.name === 'password').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                            <div className={"form-item flex-wrap repeat-password"}>
                                <input
                                    className={validation.fields.find(field => field.name === 'passwordConfirmation') ? 'invalid' : ''}
                                    placeholder={'Repeat password'}
                                    value={user.passwordConfirmation}
                                    onChange={event => {
                                        setUser({...user, passwordConfirmation: event.target.value})
                                        setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'passwordConfirmation')})
                                    }}
                                    type={"password"} />
                                { validation.fields.find(field => field.name === 'passwordConfirmation') &&
                                    validation.fields.filter(field => field.name === 'passwordConfirmation').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'form-group personal-information-group'}>
                        <div className={'group-header'}>
                            <h4>Personal information</h4>
                        </div>
                        <div className={'group-grid'}>
                            <div className={"form-item flex-wrap first-name"}>
                                <input
                                    className={validation.fields.find(field => field.name === 'firstName') ? 'invalid' : ''}
                                    placeholder={'First Name'}
                                    value={user.firstName}
                                    onChange={event => {
                                        setUser({...user, firstName: event.target.value})
                                        setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'firstName')})
                                    }}
                                    type={"text"} />
                                { validation.fields.find(field => field.name === 'firstName') &&
                                    validation.fields.filter(field => field.name === 'firstName').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                            <div className={"form-item flex-wrap last-name"}>
                                <input
                                    className={validation.fields.find(field => field.name === 'lastName') ? 'invalid' : ''}
                                    placeholder={'Last Name'}
                                    value={user.lastName}
                                    onChange={event => {
                                        setUser({...user, lastName: event.target.value})
                                        setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'lastName')})
                                    }}
                                    type={"text"} />
                                { validation.fields.find(field => field.name === 'lastName') &&
                                    validation.fields.filter(field => field.name === 'lastName').map((field, index) => (
                                        <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'form-group additional-information-group'}>
                        <div className={'group-header'}>
                            <h3>Additional information</h3>
                        </div>
                        <div className={'group-grid'}>
                            <div className={"form-item remaining-vacation-days flex-wrap"}>
                                <label htmlFor={"remainingVacationDays"} className={'w-100'}>Remaining Vacation Days: </label>
                                <br/>
                                <input
                                    id={"remainingVacationDays"}
                                    value={user.remainingVacationDays}
                                    onChange={event => setUser({...user, remainingVacationDays: parseInt(event.target.value)})}
                                    type="number"
                                    min={1}
                                    max={30}
                                />
                            </div>
                            <div className={"form-item full-time-employee flex-wrap"}>
                                <label htmlFor={"isFullTime"} className={'w-100'}>Is user full-time employee: </label>
                                <br/>
                                <Switch id={'isFullTime'} width={40} height={18} handleDiameter={18} onChange={event => setUser({...user, isFullTimeEmployee: event.valueOf()})} checked={user.isFullTimeEmployee} checkedIcon={false} uncheckedIcon={false} />
                            </div>
                            { !user.isFullTimeEmployee &&
                                <div className={"form-item weekly-working-time flex-wrap"}>
                                    <label htmlFor={"isPartTime"} className={'w-100'}>Target of weekly working time (%): </label>
                                    <br/>
                                    <input
                                        id={"isPartTime"}
                                        value={user.weeklyWorkingTime}
                                        onChange={event => setUser({...user, weeklyWorkingTime: parseInt(event.target.value)})}
                                        type={"number"}
                                        min={10}
                                        max={100}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                    <div className={'form-group user-privileges-group'}>
                        <div className={'group-header'}>
                            <h3>User privileges</h3>
                        </div>
                        <div className={'group-grid'}>
                            <div className={'form-item user-privileges flex-wrap'}>
                                <div className={'group-grid'}>
                                    {
                                        Object.keys(UserPrivileges).filter(key => isNaN(Number(key))).map((item, index) => (
                                                <div key={index} className={'flex-container align-items-center w-100'}>
                                                    <label htmlFor={item}>
                                                        {item.split(/(?=[A-Z])/).map((name, index) => index > 0 ? name.toLowerCase() : name).join(' ')}:
                                                    </label>
                                                    <div>
                                                        <Switch id={item} width={40} height={18} handleDiameter={18} onChange={event => setUser({
                                                            ...user,
                                                            privilegesValue: user.privilegesValue += parseInt(UserPrivileges[item as any]) * (event.valueOf() ? 1 : -1)
                                                        })} checked={(user.privilegesValue & parseInt(UserPrivileges[item as any])) > 0} checkedIcon={false} uncheckedIcon={false} />
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={"form-item"}>
                            <button className={"button cyan-button create-user-button"}>
                                Create
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}