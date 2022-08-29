import {FC, useEffect, useState} from "react";
import {Timer} from "./Timer";
import {useAuth} from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {
    fetchUserLastWeekTimeTrackerStatistics,
    updateCurrentWeekWorkingTime
} from "../../store/timeTracker/timeTracker.slice";
import {Statistics, StatisticPropsType, StatisticDataType, defaultMetadata} from "./Statistics";

export type TimeTrackerStatisticsStateType = {
    chart?: StatisticPropsType | null
}

const timeTrackerStatisticsInitialState: TimeTrackerStatisticsStateType = {
    chart: null
}

export const TimeTrackerPanels: FC = () => {

    const auth = useAuth()
    const dispatch = useDispatch();
    const [chartState, setChartState] = useState(timeTrackerStatisticsInitialState)
    const records = useAppSelector(state => state.rootReducer.timeTracker.records)
    const lastWeekStatistics = useAppSelector(state => state.rootReducer.timeTracker.lastWeekStatistics)
    const timeWorkedInThisWeek = useAppSelector(state => state.rootReducer.timeTracker.currentWeekWorkingTime)
    const timeToBeWorkedInThisWeek = (auth.state?.user?.weeklyWorkingTime ?? 0) * 60 * 1000
    const numberFormatter = Intl.NumberFormat('uk', {minimumIntegerDigits: 2})

    useEffect(() => {
        if (auth.state?.user?.id) {
            dispatch(updateCurrentWeekWorkingTime({userId: auth.state.user.id, monthNumber: new Date().getMonth() + 1}))
            dispatch(fetchUserLastWeekTimeTrackerStatistics({userId: auth.state.user.id}))
        }
    }, [auth, records])

    useEffect(() => {
        if (auth.state?.user && lastWeekStatistics.length > 0) {
            let statisticsData: StatisticDataType[] = []
            lastWeekStatistics.forEach(statisticsItem => {
                const statisticsDataItem: StatisticDataType = {
                    title: statisticsItem.date.toLocaleDateString('en-US', { weekday: 'short' }),
                    value: Math.floor(statisticsItem.totalWorkingTime / 60 / 60 / 10) / 100
                }
                statisticsData = [...statisticsData, statisticsDataItem]
            })
            setChartState({
                ...chartState,
                chart: {
                    metadata: {
                        maxValue: Math.floor(auth.state.user.weeklyWorkingTime / 60 / 5 * 100) / 100,
                        minValue: 0,
                        gap: 30,
                        width: 500,
                        height: 200,
                        scale: {
                            step: 2
                        }
                    },
                    data: statisticsData
                }
            })
        }
    }, [auth, lastWeekStatistics])

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
                <div className={'statistic-panel-container flex-container justify-content-center '}>
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
                    <Statistics data={chartState.chart?.data ?? []} metadata={chartState.chart?.metadata ?? defaultMetadata} />
                </div>
            </div>
        </div>
    ) : <></>
}