import {FC, useEffect, useState} from "react";
import {useActions} from "../../hooks/useActions";
import {TimeTrackerItem} from "../../type/TimeTracker/timeTracker.types";

type TimerStateType = {
    time: number,
    enabled: boolean
}

const initialState: TimerStateType = {
    time: 0,
    enabled: false
}

export const Timer: FC = () => {

    const [state, setState] = useState(initialState);
    const {addRecord} = useActions()

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
        const record: TimeTrackerItem = {
            date: new Date(),
            begin: parseInt(window.localStorage.getItem("timerStartTime") ?? ''),
            end: parseInt(window.localStorage.getItem("timerStartTime") ?? '') + state.time,
            duration: state.time
        }
        addRecord(record)
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