import {FC, useEffect, useState} from "react";
import {Record} from "../../type/TimeTracker/timeTracker.types";
import {createRecord} from "../../store/slice/timeTracker/timeTrackerSlice";
import {useAppDispatch} from "../../app/hooks";
import {TimeTrackerDefaultPropsType} from "./Home";
import {getAuthorizedUser} from "../../store/slice/authentication/authSlice";
import {parseJwt} from "../../store/parserJWT/parserJWT";
import {AuthUserResponse} from "../../type/User/AuthUser";
import {getCookie, refreshTokenKey} from "../../Cookie/Cookie";

type TimerStateType = {
    time: number,
    enabled: boolean
}

type TimerPropsType = {
    defaultProps: TimeTrackerDefaultPropsType
}

const initialState: TimerStateType = {
    time: 0,
    enabled: false
}

export const Timer: FC<TimerPropsType> = (props) => {

    const [state, setState] = useState(initialState);
    const {lastRecord} = props.defaultProps
    const dispatch = useAppDispatch()

    useEffect(() => {
        const timerStartTime = window.localStorage.getItem("timerStartTime");
        setState(initialState)
        if (timerStartTime) {
            setState({...state, enabled: true, time: new Date().getTime() - parseInt(timerStartTime)})
        }
    }, [window.onload])

    useEffect(() => {
        let interval = undefined as any;
        if (state.enabled) {
            interval = setInterval(() => {
                timerTick()
            }, 1000)
        } else if (!state.enabled && state.time !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [state])

    const timerStart = () => {
        setState({...state, enabled: true})
        window.localStorage.setItem("timerStartTime", new Date().getTime().toString())
    }

    const timerTick = () => setState({...state, time: state.time + 1000})

    const timerStop = () => {
        const record: Record = {
            employeeId: parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId),
            isAutomaticallyCreated: false,
            createdAt: new Date(parseInt(window.localStorage.getItem("timerStartTime") ?? '')),
            workingTime: state.time,
        }
        dispatch(createRecord(record))
        setState(initialState)
        window.localStorage.removeItem("timerStartTime")
    }

    return (
        <div className={"timer-panel w-100"}>
            <h3>Timer: </h3>
            <div className={"timer"}>
                <div className={"hours"}>
                    <span>{Math.floor(state.time / 3600000) < 10 ? `0${Math.floor(state.time / 3600000)}` : Math.floor(state.time / 3600000)}</span>
                    <h3>hours</h3>
                </div>
                <div className={"minutes"}>
                    <span>{Math.floor(state.time / 60000) % 60 < 10 ? `0${Math.floor(state.time / 60000) % 60}` : Math.floor(state.time / 60000) % 60}</span>
                    <h3>minutes</h3>
                </div>
                <div className={"seconds"}>
                    <span>{Math.floor(state.time / 1000) % 60 < 10 ? `0${Math.floor(state.time / 1000) % 60}` : Math.floor(state.time / 1000) % 60}</span>
                    <h3>seconds</h3>
                </div>
            </div>
            <div className={"flex-container justify-content-center"}>
                { !state.enabled ?
                    !lastRecord ?
                        <a className={"button cyan-button"} onClick={() => timerStart()}>Start</a>
                        :
                        <a className={"button silver-button disabled"}>Start</a>
                    :
                    <a className={"button red-button"} onClick={() => timerStop()}>Stop</a>
                }
            </div>
        </div>
    );
}