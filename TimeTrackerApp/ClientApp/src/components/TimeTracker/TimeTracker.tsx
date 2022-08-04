import {FC} from "react";
import {Timer} from "./Timer";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {recordToTimeTrackerListItem} from "../../store/slice/timeTracker/timeTrackerSlice";

export const TimeTracker: FC = () => {

    let records = useTypedSelector(state => state.rootReducer.timeTracker.records)
    let timeTrackerListItems = [...records].map(record => recordToTimeTrackerListItem(record));
    let lastRecord = timeTrackerListItems.sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime()).filter(record => record.date >= new Date(new Date().setHours(0, 0, 0, 0)))[0] ?? undefined;

    return (
        <div className={"time-tracker-statistic"}>
            <Timer />
            <div className={"statistic-panel w-100"}>
                <h3>Today's activity:</h3>
                <div className={"statistic-panel-list"}>
                    <div>
                        <h4>Start time</h4>
                        <span>{lastRecord ? new Date(lastRecord.begin).toLocaleTimeString() : '-'}</span>
                    </div>
                    <div>
                        <h4>End time</h4>
                        <span>{lastRecord ? new Date(lastRecord.end).toLocaleTimeString() : '-'}</span>
                    </div>
                    <div>
                        <h4>Duration</h4>
                        <span>
                            {lastRecord ?
                                `${Math.floor(lastRecord.duration / 1000 / 3600) < 10 ? `0${Math.floor(lastRecord.duration / 1000 / 3600)}` : Math.floor(lastRecord.duration / 1000 / 3600)}:${Math.floor(lastRecord.duration / 1000 / 60) % 60 < 10 ? `0${Math.floor(lastRecord.duration / 1000 / 60) % 60}` : Math.floor(lastRecord.duration / 1000 / 60) % 60}:${Math.floor(lastRecord.duration / 1000) % 3600 < 10 ? `0${Math.floor(lastRecord.duration / 1000) % 3600}` : Math.floor(lastRecord.duration / 1000) % 3600}`
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