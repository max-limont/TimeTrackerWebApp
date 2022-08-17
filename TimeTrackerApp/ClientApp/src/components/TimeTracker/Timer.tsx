import {FC, useEffect, useState} from "react";
import {Record} from "../../types/timeTracker.types";
import {createRecord} from "../../store/timeTracker/timeTracker.slice";
import {TimeTrackerDefaultPropsType} from "./Home";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";

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

    const auth = useAuth()
    const {lastRecord} = props.defaultProps
    const dispatch = useDispatch()
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const timerStartTime = window.localStorage.getItem("timerStartTime");
        setState(initialState)
        if (timerStartTime) {
            setState({...state, enabled: true, time: new Date().getTime() - parseInt(timerStartTime)})
        }
    }, [window.onload])

    useEffect(() => {
        if (auth.state?.user?.id) {
            setState({...initialState, time: auth.state.user.isFullTimeEmployee ? 8 * 60 * 60 * 1000 : state.time})
        }
    }, [auth.state?.user?.id])

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

    const automaticallyAccrueWorkingTime = () => {
        if (auth.state?.user?.id) {
            const record: Record = {
                employeeId: auth.state.user.id,
                isAutomaticallyCreated: true,
                createdAt: new Date(),
                workingTime: state.time
            }
            dispatch(createRecord(record))
        }
    }

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
                { !auth.state?.user?.isFullTimeEmployee ?
                    !state.enabled ?
                        <a className={"button cyan-button"} onClick={() => timerStart()}>Start</a>
                        :
                        <a className={"button red-button"} onClick={() => timerStop()}>Stop</a>
                    : !lastRecord ?
                        <a className={"button cyan-button full-timer-employee-button"} onClick={() => automaticallyAccrueWorkingTime()}>Automatically accrue working time</a>
                    :
                        <a className={"button cyan-button full-timer-employee-button disabled"}>Automatically accrue working time</a>
                }
            </div>
        </div>
    );
}