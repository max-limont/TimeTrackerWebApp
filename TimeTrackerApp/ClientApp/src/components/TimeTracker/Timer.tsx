import {FC, useEffect, useState} from "react";
import {Record} from "../../types/timeTracker.types";
import {createRecord} from "../../store/timeTracker/timeTracker.slice";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";

type TimerStateType = {
    time: number,
    enabled: boolean
}

const initialState: TimerStateType = {
    time: 0,
    enabled: false
}

export const Timer: FC = () => {

    const auth = useAuth()
    const dispatch = useDispatch()
    const [state, setState] = useState(initialState);

    useEffect(() => {
        if (auth.state?.user) {
            setState({...initialState, time: auth.state.user.isFullTimeEmployee ? 8 * 60 * 60 * 1000 : state.time})
        }
        const timerStartTime = window.localStorage.getItem("timerStartTime");
        setState(initialState)
        if (timerStartTime) {
            setState({...state, enabled: true, time: new Date().getTime() - parseInt(timerStartTime)})
        }
    }, [auth])

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
        if (auth.state?.user?.id) {
            const record: Record = {
                employeeId: auth.state.user.id,
                isAutomaticallyCreated: true,
                createdAt: new Date(parseInt(window.localStorage.getItem("timerStartTime") ?? '')),
                workingTime: state.time,
            }
            dispatch(createRecord(record))
        }
        setState(initialState)
        window.localStorage.removeItem("timerStartTime")
    }

    return (
        <div className={"timer-panel"}>
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
                    <a className={"button cyan-button"} onClick={() => timerStart()}>Start</a>
                    :
                    <a className={"button red-button"} onClick={() => timerStop()}>Stop</a>
                }
            </div>
        </div>
    );
}