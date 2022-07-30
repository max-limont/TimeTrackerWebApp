import React, {FC, useState} from 'react';
import { useAppDispatch } from '../../app/hooks';
import { authUserAction } from '../../store/actions/auth/authActions';
import { AuthUser, EmptyAuthUser } from '../../type/User/AuthUser';

export const AuthenticationForm: FC = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState(EmptyAuthUser);

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