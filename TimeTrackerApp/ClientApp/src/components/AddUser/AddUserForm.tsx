import React, {useEffect, useState} from 'react';
import {useAuth} from "../../hooks/useAuth";
import {graphqlRequest} from "../../graphql/api";
import {createUserQuery, isUserExistQuery} from "../../graphql/queries/user.queries";
import {useNavigate} from "react-router-dom";

interface UserData {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    isFullTimeEmployee: boolean
}

interface InputsCheck {
    email: boolean,
    password: boolean
}

const UserDataInit = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isFullTimeEmployee: true
}

const AddUserForm = () => {
    const [user, setUser] = useState<UserData>(UserDataInit)
    const [checkInputs, setCheckInputs] = useState<InputsCheck>({email: false, password: false})
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const navigate = useNavigate()

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
                    <span style={{color: "red"}}>message</span>
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
                            value={user.password}
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
                    <span style={{color: "red"}}>message</span>
                    <div className={"form-item w-100"}>
                            <label htmlFor={"isPartTime"}>Part-time: </label>
                            <input
                                style={{width: "auto"}}
                                id={"isPartTime"}
                                onChange={event => setUser({...user, isFullTimeEmployee: !event.target.checked})}
                                type="checkbox"/>
                    </div>

                    <div className={"form-item w-100"}>
                        <button onClick={async (e) => {
                            e.preventDefault()
                            const checks = {
                                password: user.password != repeatPassword,
                                email: (await graphqlRequest(isUserExistQuery, {email: user.email})).data.IsUserEmailExist
                            }
                            setCheckInputs(checks)
                            if (!checks.email && !checks.password) {
                                await graphqlRequest(createUserQuery, {
                                    user:{
                                        email: user.email,
                                        password: user.password,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        isFullTimeEmployee: user.isFullTimeEmployee
                                    }
                                })
                                // navigate("/user-list", {replace: true})
                            }
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