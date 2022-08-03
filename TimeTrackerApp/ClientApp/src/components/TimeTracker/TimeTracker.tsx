import {FC} from "react";
import {Timer} from "./Timer";

export const TimeTracker: FC = () => {

    return (
        <div className={"time-tracker-statistic"}>
            <Timer />
            <div className={"statistic-panel w-100"}>
                <h3>Today's activity:</h3>
                <div className={"statistic-panel-list"}>
                    <div>
                        <h4>Start time</h4>
                        <span>-</span>
                    </div>
                    <div>
                        <h4>End time</h4>
                        <span>-</span>
                    </div>
                    <div>
                        <h4>Duration</h4>
                        <span>-</span>
                    </div>
                </div>
                <div className={"timer-tip"}>
                    <p>Tip: You have not started timer today! Click "Start" button on the timer.</p>
                </div>
            </div>
        </div>
    );
}