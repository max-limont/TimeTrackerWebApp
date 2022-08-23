import {FC, useEffect} from "react";
import {Timer} from "./Timer";
import {useAuth} from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {updateCurrentWeekWorkingTime} from "../../store/timeTracker/timeTracker.slice";
import {Statistic, StatisticPropsType} from "./Statistic";

const statisticData: StatisticPropsType = {
    metadata: {
        maxValue: 8 * 60 * 60 * 1000,
        minValue: -3 * 60 * 60 * 1000,
        gap: 50,
        itemWidth: 50,
        width: 400,
        height: 200
    },
    data: [
        {
            title: "Mon",
            value: 60 * 60 * 1000
        },
        {
            title: "Tue",
            value: -3 * 60 * 60 * 1000
        },
        {
            title: "Wed",
            value: 4 * 60 * 60 * 1000
        },
        {
            title: "Thu",
            value: 6 * 60 * 60 * 1000
        },
        {
            title: "Fri",
            value: 10 * 60 * 60 * 1000
        }
    ]
}

export const TimeTrackerPanels: FC = () => {

    const auth = useAuth()
    const dispatch = useDispatch();
    const records = useAppSelector(state => state.rootReducer.timeTracker.records)
    const timeWorkedInThisWeek = useAppSelector(state => state.rootReducer.timeTracker.currentWeekWorkingTime)
    const timeToBeWorkedInThisWeek = (auth.state?.user?.weeklyWorkingTime ?? 0) * 60 * 1000
    const numberFormatter = Intl.NumberFormat('uk', {minimumIntegerDigits: 2})

    useEffect(() => {
        if (auth.state?.user?.id) {
            dispatch(updateCurrentWeekWorkingTime({userId: auth.state.user.id, monthNumber: new Date().getMonth() + 1}))
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
                <div className={"statistic-panel-list"}>
                    <div>
                        <h4>Time worked</h4>
                        <span>
                            { getFormattedTime(timeWorkedInThisWeek) }
                        </span>
                    </div>
                    <div>
                        <h4>Time to work</h4>
                        <span>
                            { getFormattedTime(timeToBeWorkedInThisWeek) }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : <></>
    // <Statistic data={statisticData.data} metadata={statisticData.metadata} />
}