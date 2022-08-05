import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {authLoginAction} from '../../store/actions/auth/authActions';
import {getCookie, refreshTokenKey} from '../../Cookie/Cookie';
import {AuthorizationUser, EmptyAuthUser} from '../../type/User/AuthUser';
import {setError} from "../../store/slice/authentication/authSlice";
import {Message, MessageTypes} from "../Layout/Message";

type AuthenticationFormState = {
    userData: AuthorizationUser,
    error?: string | null
}

const initialState: AuthenticationFormState = {
    userData: EmptyAuthUser,
    error: null
}

export const AuthenticationForm: FC = () => {

    const dispatch = useAppDispatch();
    const [state, setState] = useState(initialState);
    const accessToken = useAppSelector(state => state.rootReducer.auth.accessToken);
    const authErrorMessage = useAppSelector(state => state.rootReducer.auth.error);
    const refreshToken = getCookie(refreshTokenKey);
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken && refreshToken) {
            navigate("/");
        } else {
            navigate("/welcome");
        }
    },[accessToken, refreshToken]);

    useEffect(() => {
        if (authErrorMessage) {
            setState({...state, error: authErrorMessage})
            dispatch(setError(''));
        }
    }, [authErrorMessage])

    return (
        <div className={"flex-container flex-column position-relative"}>
            { state.error &&
                <Message message={state.error} type={MessageTypes.Error}/>
            }
            <form className={"authentication-form"}>
                <div className={"form-group"}>
                    <div className={"form-item w-100"}>
                        <span style={{margin: "0 auto", fontSize: "25px",fontWeight: "2px"}}>TimeTracker</span>
                    </div>
                    <div className={"form-item w-100"}>
                        <input id={'login'} placeholder={'Login'} value={state.userData.email} onChange={(e) => setState({...state, userData: {...state.userData, email: e.target.value}})} type="email" />
                    </div>
                    <div className={"form-item w-100"}>
                        <input id={'password'} placeholder={'Password'} value={state.userData.password} onChange={(e) => setState({...state, userData: {...state.userData, password: e.target.value}})} type="password" />
                    </div>
                    <div className={"form-item w-100"}>
                        <button onClick={(e) => {
                            e.preventDefault()
                            dispatch(authLoginAction(state.userData))
                        }} className={"button dark-button w-100"}>
                            Sign in
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};