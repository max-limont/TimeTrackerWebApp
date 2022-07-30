import React, {FC, useState} from 'react';
import { useAppDispatch } from '../../app/hooks';
import { authUserAction } from '../../store/actions/auth/authActions';

type AuthenticationFormStateType = {
    login: string,
    password: string
}

const initialValue: AuthenticationFormStateType = {
    login: '',
    password: ''
}

export const AuthenticationForm: FC = () => {
    const dispatch = useAppDispatch();
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
                    <button type={"reset"} onSubmit={(e)=>e.preventDefault()} className={"button dark-button w-100"} 
                    onClick={()=>{
                        dispatch(authUserAction({email:"",password:""}));
                        console.log(123);
                        }}>
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    );
};