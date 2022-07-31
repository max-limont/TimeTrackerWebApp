import React, {FC, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authUserAction } from '../../store/actions/auth/authActions';
import { AuthUserResponse, EmptyAuthUser } from '../../type/User/AuthUser';

export const AuthenticationForm: FC = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState(EmptyAuthUser);
    const tokens = useAppSelector(s=>s.rootReducer.auth.token);
    const navigate = useNavigate();
    useEffect(()=>{
        if(tokens?.accessToken!=null){
            navigate("/");
        }
    },[tokens]);
    return (
        <form className={"authentication-form"}>
            <div className={"form-group"}>
                <div className={"form-item w-100"}>
                    <span className={""}>TimeTracker</span>
                </div>
                <div className={"form-item w-100"}>
                    <input id={'login'} placeholder={'Login'} value={state.email} onChange={(e) => setState({...state, email: e.target.value})} type="email"/>
                </div>
                <div className={"form-item w-100"}>
                    <input id={'password'} placeholder={'Password'} value={state.password} onChange={(e) =>
                     {setState({...state, password: e.target.value})
                     console.log(e.target.value);}}
                type="password"/>
                </div>
                <div className={"form-item w-100"}>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        console.log(state);
                        dispatch(authUserAction(state));
                    }} className={"button dark-button w-100"}>
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    );
};