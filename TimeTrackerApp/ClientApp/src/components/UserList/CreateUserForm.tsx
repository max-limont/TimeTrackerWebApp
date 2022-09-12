import React, {FormEvent, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {User, UserPrivileges} from "../../types/user.types";
import Switch from "react-switch";
import {createUserAction} from "../../store/userList/userList.slice";

type InputsCheck = {
    email: boolean,
    password: boolean
}

const initialState: User = {
    id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isFullTimeEmployee: false,
    weeklyWorkingTime: 2400,
    remainingVacationDays: 30,
    privilegesValue: 0
}

const CreateUserForm = () => {
    const {createdUser} = useAppSelector(state => state.rootReducer.userList)
    const [user, setUser] = useState(initialState)
    const [checkInputs, setCheckInputs] = useState<InputsCheck>({email: false, password: false})
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setUser({...user, weeklyWorkingTime: user.isFullTimeEmployee ? initialState.weeklyWorkingTime : initialState.weeklyWorkingTime / 2})
    }, [user.isFullTimeEmployee])

    const submit = (event: FormEvent) => {
        event.preventDefault()
        const isPasswordError = user.password != repeatPassword
        setCheckInputs({...checkInputs, password: isPasswordError})
        if (!isPasswordError) {
            dispatch(createUserAction(user))
            setCheckInputs({...checkInputs, email: createdUser == null})
            navigate("/user-list", {replace: true})
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
                            <div className={"form-item email"}>
                                <input
                                    placeholder={'Email'}
                                    value={user.email}
                                    onChange={event => setUser({
                                        ...user, email: event.target.value
                                    })}
                                    type="email"/>
                            </div>
                            { checkInputs.email && <span className={'validation-error'}>This email already exist!</span> }
                            <div className={"form-item password"}>
                                <input
                                    placeholder={'Password'}
                                    value={String(user.password)}
                                    onChange={event => setUser({
                                        ...user, password: event.target.value
                                    })}
                                    type="password"/>
                            </div>
                            <div className={"form-item repeat-password"}>
                                <input
                                    placeholder={'Repeat password'}
                                    value={repeatPassword}
                                    onChange={event => setRepeatPassword(event.target.value)}
                                    type="password"/>
                            </div>
                            { checkInputs.password && <span className={'validation-error'}>Passwords do not match!</span> }
                        </div>
                    </div>
                    <div className={'form-group personal-information-group'}>
                        <div className={'group-header'}>
                            <h4>Personal information</h4>
                        </div>
                        <div className={'group-grid'}>
                            <div className={"form-item first-name"}>
                                <input
                                    placeholder={'First Name'}
                                    value={user.firstName}
                                    onChange={event => setUser({
                                        ...user, firstName: event.target.value
                                    })}
                                    type="text"/>
                            </div>
                            <div className={"form-item last-name"}>
                                <input
                                    placeholder={'Last Name'}
                                    value={user.lastName}
                                    onChange={event => setUser({
                                        ...user, lastName: event.target.value
                                    })}
                                    type="text"/>
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
                                    type="number"/>
                            </div>
                            <div className={"form-item full-time-employee flex-wrap"}>
                                <label htmlFor={"isFullTime"} className={'w-100'}>Is user full-time employee: </label>
                                <br/>
                                <Switch id={'isFullTime'} width={40} height={18} handleDiameter={18} onChange={event => setUser({
                                    ...user,
                                    isFullTimeEmployee: event.valueOf()
                                })} checked={user.isFullTimeEmployee} checkedIcon={false} uncheckedIcon={false} />
                            </div>
                            { !user.isFullTimeEmployee &&
                                <div className={"form-item weekly-working-time flex-wrap"}>
                                    <label htmlFor={"isPartTime"} className={'w-100'}>Target of weekly working time (minutes): </label>
                                    <br/>
                                    <input
                                        id={"isPartTime"}
                                        value={user.weeklyWorkingTime}
                                        onChange={event => setUser({...user, weeklyWorkingTime: parseInt(event.target.value)})}
                                        type="number"/>
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
};

export default CreateUserForm;