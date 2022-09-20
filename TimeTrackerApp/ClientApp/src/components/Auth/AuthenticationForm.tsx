import React, {FC, FormEvent, useEffect, useState} from 'react';
import { AuthorizationUser } from '../../types/auth.types';
import { useAuth } from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {ValidationFieldType, ValidationStateType} from "../../types/validation.types";
import {clearError} from "../../store/auth/auth.slice";
import {useDispatch} from "react-redux";

type AuthenticationFormState = {
    userData: AuthorizationUser,
}

const initialState: AuthenticationFormState = {
    userData: {
        email: '',
        password: ''
    } as AuthorizationUser,
}

const validationState: ValidationStateType = {
    fields: []
}

export const AuthenticationForm: FC = () => {

    const dispatch = useDispatch()
    const isLoadingAuth = useAppSelector(state => state.rootReducer.auth.isLoading)
    const authError = useAppSelector(state => state.rootReducer.auth.error)
    const [state, setState] = useState(initialState);
    const [validation, setValidationState] = useState(validationState)
    const auth = useAuth();

    useEffect(() => {
        if (authError && authError.length > 0) {
            setValidationState({...validationState, fields: [...validation.fields, {name: 'password', validationMessage: authError}]})
            dispatch(clearError())
        }
    }, [authError])

    const validateFormFields = (): boolean => {
        let fields: ValidationFieldType[] = []

        if (state.userData.email.trim() === '' || !state.userData.email) {
            fields = [...fields, {name: 'email', validationMessage: `Field 'Email' cannot be empty!`}]
        }

        if (state.userData.password.trim() === '' || !state.userData.password) {
            fields = [...fields, {name: 'password', validationMessage: `Field 'Password' cannot be empty!`}]
        }
        setValidationState({...validationState, fields: fields})
        return fields.length === 0
    }

    const submit = (event: FormEvent) => {
        event.preventDefault()

        if (validateFormFields()) {
            auth.signIn(state.userData, () => { });
        }
    }

    return (
        <div className={"flex-container flex-column position-relative"}>
            {
                isLoadingAuth &&
                <div className="spinner-container">
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                    </svg>
                </div>
            }
            <form className={"authentication-form"} onSubmit={event => submit(event)}>
                <div className={"form-group"}>
                    <div className={"group-grid"}>
                        <div className={"form-item flex-wrap w-100"}>
                            <span style={{ margin: "0 auto", fontSize: "25px", fontWeight: "2px", paddingBlock: "5px" }}>TimeTracker</span>
                        </div>
                        <div className={"form-item flex-wrap w-100"}>
                            <input className={validation.fields.find(field => field.name === 'email') ? 'invalid' : ''} id={'login'} placeholder={'Email'} value={state.userData.email} onChange={event => {
                                setState({ ...state, userData: { ...state.userData, email: event.target.value } })
                                setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'email')})
                            }} type={"email"} />
                            { validation.fields.find(field => field.name === 'email') &&
                                validation.fields.filter(field => field.name === 'email').map((field, index) => (
                                    <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                ))
                            }
                        </div>
                        <div className={"form-item flex-wrap w-100"}>
                            <input className={validation.fields.find(field => field.name === 'password') ? 'invalid' : ''} id={'password'} placeholder={'Password'} value={state.userData.password} onChange={event => {
                                setState({ ...state, userData: { ...state.userData, password: event.target.value } })
                                setValidationState({...validation, fields: validation.fields.filter(field => field.name !== 'password')})
                            }} type={"password"} />
                            { validation.fields.find(field => field.name === 'password') &&
                                validation.fields.filter(field => field.name === 'password').map((field, index) => (
                                    <p key={index} className={'validation-error w-100'}>{field.validationMessage}</p>
                                ))
                            }
                        </div>
                        <div className={"form-item w-100"}>
                            <button className={"button dark-button w-100"}>
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};