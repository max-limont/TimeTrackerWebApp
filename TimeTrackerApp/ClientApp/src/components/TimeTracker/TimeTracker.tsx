import {FC, useState} from "react";
import {Timer} from "./Timer";
import {TimeTrackerDefaultPropsType} from "./Home";
import {useAuth} from "../../hooks/useAuth";

type TimeTrackerPropsType = {
    defaultProps: TimeTrackerDefaultPropsType
}

type TimeTrackerStateType = {
    chooseTimeInput?: string
}

const initialState: TimeTrackerStateType = {
    chooseTimeInput: '12:00'
}

export const TimeTracker: FC<TimeTrackerPropsType> = (props) => {

    const auth = useAuth()
    const [state, setState] = useState(initialState)
    const {records, lastRecord} = props.defaultProps;
    const workingDaysInMonth = getWorkingDaysInRange(new Date(new Date().setDate(1)), new Date(new Date(new Date().setMonth(new Date().getMonth() + 1)).setDate(0)))
    const hoursWorkedInThisMonth = Math.round(records.filter(record => record.date.getTime() >= new Date().setDate(1)).reduce((sum, record) => sum + record.duration, 0) / 1000 / 36 * 100) / 10000
    const hoursToBeWorkedInThisMonth = Math.round((auth.state?.user?.weeklyWorkingTime ?? 0) / 5 * workingDaysInMonth / 60 * 10000) / 10000
    const attendance = records.filter(record => record.date.getTime() >= new Date().setDate(1)).length

    return (
        <div className={"time-tracker-statistic w-100"}>
            { (auth.state?.user?.weeklyWorkingTime ?? 0) !== 5 * 8 * 60 ?
                <Timer defaultProps={{records: records, lastRecord: lastRecord} as TimeTrackerDefaultPropsType}/>
                :
                <div className={"full-timer-choose-time-panel"}>
                    <h3>Automatic accrual of working hours:</h3>
                    <div className={"flex-container flex-column"}>
                        <span>Choose the time for automatic accrual of working hours</span>
                        <input type="time" value={state.chooseTimeInput} onChange={event => setState({...state, chooseTimeInput: event.target.value})}/>
                        <a className={"button dark-button"}>Save</a>
                    </div>
                </div>
            }
            <div className={"statistic-panel w-100"}>
                <h3>Current month activity:</h3>
                <div className={"statistic-panel-list"}>
                    <div>
                        <h4>Time worked</h4>
                        <span>
                            {hoursWorkedInThisMonth} hours
                        </span>
                    </div>
                    <div>
                        <h4>Time to be worked</h4>
                        <span>
                            {hoursToBeWorkedInThisMonth} hours
                        </span>
                    </div>
                    <div>
                        <h4>Attendance</h4>
                        <span>
                            {attendance} days
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const getWorkingDaysInRange = (startDate: Date, endDate: Date): number => {
    let workingDays = 0;
    let currentDate = startDate;
    while (currentDate <= endDate) {
        let weekDay = currentDate.getDay()
        if (weekDay != 0 && weekDay != 6)
            workingDays++;
        currentDate.setDate(currentDate.getDate() + 1)
    }
    return workingDays;
}