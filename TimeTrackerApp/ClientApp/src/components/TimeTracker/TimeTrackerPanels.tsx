import {FC, useEffect} from "react";
import {Timer} from "./Timer";
import {useAuth} from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {
    fetchUserLastWeekTimeTrackerStatistics,
    updateCurrentWeekWorkingTime
} from "../../store/timeTracker/timeTracker.slice";
import {Statistic, StatisticPropsType} from "./Statistic";

const statisticData: StatisticPropsType = {
    metadata: {
        maxValue: 8,
        minValue: 0,
        gap: 50,
        itemWidth: 50,
        width: 500,
        height: 200,
        scale: {
            step: 1
        }
    },
    data: [
        {
            title: "Mon",
            value: 1
        },
        {
            title: "Tue",
            value: 8
        },
        {
            title: "Wed",
            value: 4
        },
        {
            title: "Thu",
            value: 6
        },
        {
            title: "Fri",
            value: 10
        }
    ]
}

export const TimeTrackerPanels: FC = () => {

    const auth = useAuth()
    const dispatch = useDispatch();
    const records = useAppSelector(state => state.rootReducer.timeTracker.records)
    const lastWeekStatistics = useAppSelector(state => state.rootReducer.timeTracker.lastWeekStatistics)
    const timeWorkedInThisWeek = useAppSelector(state => state.rootReducer.timeTracker.currentWeekWorkingTime)
    const timeToBeWorkedInThisWeek = (auth.state?.user?.weeklyWorkingTime ?? 0) * 60 * 1000
    const numberFormatter = Intl.NumberFormat('uk', {minimumIntegerDigits: 2})

    useEffect(() => {
        if (auth.state?.user?.id) {
            dispatch(updateCurrentWeekWorkingTime({userId: auth.state.user.id, monthNumber: new Date().getMonth() + 1}))
            dispatch(fetchUserLastWeekTimeTrackerStatistics({userId: auth.state.user.id}))
            console.log(lastWeekStatistics)
        }
    }, [auth, records])

    const getFormattedTime = (milliseconds: number): string => {
        const hours = numberFormatter.format(Math.floor(milliseconds / 60 / 60 / 1000))
        const minutes = numberFormatter.format(Math.floor(milliseconds / 60 / 1000 % 60))
        const seconds = numberFormatter.format(Math.floor(milliseconds / 1000) % 60)
        return `${hours}h. ${minutes}m. ${seconds}s.`
    }

    return !auth.state?.user?.isFullTimeEmployee ? (
        <div className={`time-tracker-statistic`}>
            <Timer />
            <div className={"statistic-panel flex-container flex-column"}>
                <h3>This week activity:</h3>
                <div className={'statistic-panel-container flex-container justify-content-center align-items-center'}>
                    <div className={'statistic-panel-list flex-container flex-column'}>
                        <div>
                            <h4>Time worked</h4>
                            <span>{getFormattedTime(timeWorkedInThisWeek)}</span>
                        </div>
                        <div>
                            <h4>Time left to work</h4>
                            <span>{getFormattedTime(Math.max(0, timeToBeWorkedInThisWeek - timeWorkedInThisWeek))}</span>
                        </div>
                    </div>
                    <Statistic data={statisticData.data} metadata={statisticData.metadata} />
                </div>
            </div>
        </div>
    ) : <></>
}