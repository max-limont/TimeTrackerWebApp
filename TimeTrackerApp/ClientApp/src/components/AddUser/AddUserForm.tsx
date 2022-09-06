import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {graphqlRequest} from "../../graphql/api";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUserAction} from "../../store/userList/userList.slice";
// import {UserCreateData} from "../../types/user.types";
import {useAppSelector} from "../../hooks/useAppSelector";
import {User} from "../../types/user.types";

interface InputsCheck {
    email: boolean,
    password: boolean
}

const UserDataInit: User = {
    id: 0,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isFullTimeEmployee: true,
    weeklyWorkingTime: 2400,
    remainingVacationDays: 30,
    privilegesValue: 0
}

const AddUserForm = () => {
    const {createdUser} = useAppSelector(state => state.rootReducer.userList)
    const [user, setUser] = useState<User>(UserDataInit)
    const [checkInputs, setCheckInputs] = useState<InputsCheck>({email: false, password: false})
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{
        if (!user.isFullTimeEmployee)
            setUser({...user, weeklyWorkingTime: UserDataInit.weeklyWorkingTime / 2})
        else
            setUser({...user, weeklyWorkingTime: UserDataInit.weeklyWorkingTime})
    }, [user.isFullTimeEmployee])

    useEffect(()=>{
        if (createdUser != null)
            navigate("/user-list", {replace: true})
    }, [createdUser])

    return (
        <div className={"flex-container flex-column"}>
            <form className={"authentication-form addUserForm"}>
                <div className={"form-group"}>
                    <div className={"form-item w-100"}>
                        <span style={{margin: "0 auto", fontSize: "25px", fontWeight: "2px"}}>Add User</span>
                    </div>
                    <div className={"form-item w-100"}>
                        <input
                            placeholder={'Email'}
                            value={user.email}
                            onChange={event => setUser({
                                ...user, email: event.target.value
                            })}
                            type="email"/>
                    </div>
                    {
                        checkInputs.email
                            ? <span style={{color: "red"}}>This email already exist!</span>
                            : null
                    }
                    <div className={"form-item w-100"}>
                        <input
                            placeholder={'First Name'}
                            value={user.firstName}
                            onChange={event => setUser({
                                ...user, firstName: event.target.value
                            })}
                            type="text"/>
                    </div>
                    <div className={"form-item w-100"}>
                        <input
                            placeholder={'Last Name'}
                            value={user.lastName}
                            onChange={event => setUser({
                                ...user, lastName: event.target.value
                            })}
                            type="text"/>
                    </div>
                    <div className={"form-item w-100"}>
                        <input
                            placeholder={'Password'}
                            value={String(user.password)}
                            onChange={event => setUser({
                                ...user, password: event.target.value
                            })}
                            type="password"/>
                    </div>
                    <div className={"form-item w-100"}>
                        <input
                            placeholder={'Repeat password'}
                            value={repeatPassword}
                            onChange={event => setRepeatPassword(event.target.value)}
                            type="password"/>
                    </div>
                    {
                        checkInputs.password
                            ? <span style={{color: "red"}}>Passwords do not match!</span>
                            : null
                    }
                    <div className={"form-item w-100"}>
                        <label htmlFor={"remainingVacationDays"}>Remaining Vacation Days: </label>
                        <input
                            style={{width: "auto"}}
                            id={"remainingVacationDays"}
                            value={user.remainingVacationDays}
                            onChange={event => setUser({...user, remainingVacationDays: parseInt(event.target.value)})}
                            type="number"/>
                    </div>
                    <div className={"form-item w-100"}>
                        <label htmlFor={"isPartTime"}>Part-time: </label>
                        <input
                            style={{width: "auto"}}
                            id={"isPartTime"}
                            onChange={event => setUser({
                                ...user,
                                isFullTimeEmployee: !event.target.checked
                            })}
                            type="checkbox"/>
                    </div>

                    {
                        !user.isFullTimeEmployee
                            ? <div className={"form-item w-100"}>
                                <label htmlFor={"isPartTime"}>Target of weekly working time (minutes): </label>
                                <input
                                    style={{width: "auto"}}
                                    id={"isPartTime"}
                                    value={user.weeklyWorkingTime}
                                    onChange={event => setUser({...user, weeklyWorkingTime: parseInt(event.target.value)})}
                                    type="number"/>
                            </div>
                            : null
                    }

                    <div className={"form-item w-100"}>
                        <button onClick={e => {
                            e.preventDefault()
                            const isPasswordError = user.password != repeatPassword
                            setCheckInputs({...checkInputs, password: isPasswordError})
                            if (isPasswordError)
                                return

                            dispatch(createUserAction(user))
                            setCheckInputs({...checkInputs, email: createdUser == null})
                        }}
                                className={"button dark-button w-100"}>
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddUserForm;