import {FC} from "react";
import {Timer} from "./Timer";
import {TimeTrackerDefaultPropsType} from "./Home";

type TimeTrackerPropsType = {
    defaultProps: TimeTrackerDefaultPropsType
}

export const TimeTracker: FC<TimeTrackerPropsType> = (props) => {

    const {records, lastRecord} = props.defaultProps;

    return (
        <div className={"time-tracker-statistic w-100"}>
            <Timer defaultProps={{records: records, lastRecord: lastRecord} as TimeTrackerDefaultPropsType}/>
            <div className={"statistic-panel w-100"}>
                <h3>Today's activity:</h3>
                <div className={"statistic-panel-list"}>
                    <div>
                        <h4>Start time</h4>
                        <span>{lastRecord ? new Date(new Date(lastRecord.begin).toLocaleString() + " UTC").toLocaleTimeString() : '-'}</span>
                    </div>
                    <div>
                        <h4>End time</h4>
                        <span>{lastRecord ? new Date(new Date(lastRecord.end).toLocaleString() + " UTC").toLocaleTimeString() : '-'}</span>
                    </div>
                    <div>
                        <h4>Duration</h4>
                        <span>
                            {lastRecord ?
                                `${Math.floor(lastRecord.duration / 1000 / 3600) < 10 ? `0${Math.floor(lastRecord.duration / 1000 / 3600)}` : Math.floor(lastRecord.duration / 1000 / 3600)}:${Math.floor(lastRecord.duration / 1000 / 60) % 60 < 10 ? `0${Math.floor(lastRecord.duration / 1000 / 60) % 60}` : Math.floor(lastRecord.duration / 1000 / 60) % 60}:${Math.floor(lastRecord.duration / 1000) % 60 < 10 ? `0${Math.floor(lastRecord.duration / 1000) % 60}` : Math.floor(lastRecord.duration / 1000) % 60}`
                                : '-'
                            }
                        </span>
                    </div>
                </div>
                <div className={"timer-tip"}>
                    <p>{ !lastRecord ? `Tip: You have not started timer today! Click "Start" button on the timer.` : `Tip: You have already used the timer today. You can start it again tomorrow.`}</p>
                </div>
            </div>
        </div>
    );
}