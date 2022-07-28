import React, {FC, useState} from 'react';

type AuthenticationFormStateType = {
    login: string,
    password: string
}

const initialValue: AuthenticationFormStateType = {
    login: '',
    password: ''
}

export const AuthenticationForm: FC = () => {
    const [state, setState] = useState(initialValue)

    return (
        <form className={"authentication-form"}>
            <div className={"form-group"}>
                <div className={"form-item w-100"}>
                    <span className={""}>TimeTracker</span>
                </div>
                <div className={"form-item w-100"}>
                    <input id={'login'} placeholder={'Login'} value={state.login} onChange={(e) => setState({...state, login: e.target.value})} type="email"/>
                </div>
                <div className={"form-item w-100"}>
                    <input id={'password'} placeholder={'Password'} value={state.password} onChange={(e) => setState({...state, password: e.target.value})} type="password"/>
                </div>
                <div className={"form-item w-100"}>
                    <button className={"button dark-button w-100"}>
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    );
};