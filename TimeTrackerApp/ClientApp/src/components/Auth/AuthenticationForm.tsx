import { FC, useEffect, useState } from 'react';
import { AuthorizationUser } from '../../types/auth.types';
import { setError } from "../../store/auth/auth.slice";
import { Message, MessageTypes } from "../Layout/Message";
import { useAuth } from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import { authSignalR } from '../../store/store';

type AuthenticationFormState = {
    userData: AuthorizationUser,
    error?: string | null
}

const initialState: AuthenticationFormState = {
    userData: {
        email: '',
        password: ''
    } as AuthorizationUser,
    error: null
}

export const AuthenticationForm: FC = () => {

    const dispatch = useDispatch();
    const isLoadingAuth = useAppSelector(state => state.rootReducer.auth.isLoading)
    const [state, setState] = useState(initialState);
    const authErrorMessage = useAppSelector(state => state.rootReducer.auth.error);
    const auth = useAuth();

    useEffect(() => {
        if (authErrorMessage) {
            setState({ ...state, error: authErrorMessage })
            dispatch(setError(''));
        }
    }, [authErrorMessage])

    return (
        <div className={"flex-container flex-column position-relative"}>
            {state.error &&
                <Message message={state.error} type={MessageTypes.Error} />
            }
            {
                isLoadingAuth &&
                <div className="spinner-container">
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                    </svg>
                </div>
            }
            <form className={"authentication-form"}>
                <div className={"form-group"}>
                    <div className={"form-item w-100"}>
                        <span style={{ margin: "0 auto", fontSize: "25px", fontWeight: "2px" }}>TimeTracker</span>
                    </div>
                    <div className={"form-item w-100"}>
                        <input id={'login'} placeholder={'Login'} value={state.userData.email} onChange={event => setState({ ...state, userData: { ...state.userData, email: event.target.value } })} type="email" />
                    </div>
                    <div className={"form-item w-100"}>
                        <input id={'password'} placeholder={'Password'} value={state.userData.password} onChange={event => setState({ ...state, userData: { ...state.userData, password: event.target.value } })} type="password" />
                    </div>
                    <div className={"form-item w-100"}>
                        <button onClick={event => {
                            event.preventDefault()
                            auth.signIn(state.userData, () => { });
                            dispatch( authSignalR(state.userData));
                        }} className={"button dark-button w-100"}>
                            Sign in
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};