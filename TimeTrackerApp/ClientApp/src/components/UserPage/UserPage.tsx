import React, {FC, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {getUserById} from "../../store/user/user.slice";
import {useAppSelector} from "../../hooks/useAppSelector";
import {Statistics, StatisticPropsType, StatisticDataType, defaultMetadata} from "../TimeTracker/Statistics";
import {
    fetchAllRecords, fetchAllUserRecords,
    fetchUserLastWeekTimeTrackerStatistics,
    recordToTimeTrackerListItem
} from "../../store/timeTracker/timeTracker.slice";
import {ContentStateType} from "../Layout/Content";
import {TimeTrackerList} from "../TimeTracker/TimeTrackerList";

export type TimeTrackerStatisticsStateType = {
    chart?: StatisticPropsType | null
}

const initialState: ContentStateType = {
    showContent: false
}

const timeTrackerStatisticsInitialState: TimeTrackerStatisticsStateType = {
    chart: null
}

export const UserPage: FC = () => {

    const auth = useAuth()
    const user = useAppSelector((x) => x.rootReducer.user.user)
    const [chartState, setChartState] = useState(timeTrackerStatisticsInitialState)
    const {id} = useParams();
    const [state, setState] = useState(initialState)
    const dispatch = useDispatch()
    let records = useAppSelector(state => state.rootReducer.timeTracker.records)
    let timeTrackerListItems = [...records].map(record => recordToTimeTrackerListItem(record)).sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime());
    let lastRecord = timeTrackerListItems.filter(record => record.date >= new Date(new Date().setHours(0, 0, 0, 0)))[0] ?? undefined


    const lastWeekStatistics = useAppSelector(state => state.rootReducer.timeTracker.lastWeekStatistics)
    useEffect(() => {
        if (auth.state?.user && id) {
            dispatch(getUserById({id: parseInt(id)}))
            dispatch(fetchUserLastWeekTimeTrackerStatistics({userId: parseInt(id)}))
            dispatch(fetchAllUserRecords(parseInt(id)))
        }
        // get the timetrackers
    }, [auth, id])

    useEffect(() => {
        if (auth.state?.user && (records || lastRecord)) {
            setState({...state, showContent: true})
        }
    }, [auth])


    useEffect(() => {
        if (user && lastWeekStatistics.length > 0) {
            let statisticsData: StatisticDataType[] = []
            lastWeekStatistics.forEach(statisticsItem => {
                const statisticsDataItem: StatisticDataType = {
                    title: statisticsItem.date.toLocaleDateString('en-US', {weekday: 'short'}),
                    value: Math.floor(statisticsItem.totalWorkingTime / 60 / 60 / 10) / 100
                }
                statisticsData = [...statisticsData, statisticsDataItem]
            })
            setChartState({
                ...chartState,
                chart: {
                    metadata: {
                        maxValue: Math.floor(user.weeklyWorkingTime / 60 / 5 * 100) / 100,
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

    return (
        <div className={'className="section-content flex-container flex-column"'}>
            <form className={'editForm'}>
                <div className={'row'}>
                    <img src={`${process.env.PUBLIC_URL}/images/ava.jpg`} alt={"user-profile-image"}/>
                    <div className={'infoContainerAbsolute'}>
                        <label className={'nameLabel'}>{user?.firstName} </label>
                        <label className={'nameLabel'}>{user?.lastName}</label>
                        <div className={'typeOfWork'}>
                            {
                                user?.isFullTimeEmployee ?
                                    <label className={'typeOfWork'}>Full-Timer</label>
                                    :
                                    <label className={'typeOfWork'}>Part-Timer</label>
                            }
                        </div>
                    </div>

                </div>
                <div className={'annotation'}>
                    Contact information
                </div>
                <hr/>

                <div className={'contactInfo'}>
                    <div className={'infoContainer'}>
                        <label className={'formControlLabel'}>Email: </label>


                        <label className={'formResponseLabel'}>{user?.email}</label>
                    </div>


                    <div className={'infoContainer'}>
                        <label className={'formControlLabel'}>Vacation days left: </label>
                        <label className={'formResponseLabel'}>{user?.remainingVacationDays}</label>
                    </div>
                    <div className={'infoContainer'}>
                        <label className={'formControlLabel'}>Time to work per day </label>
                        <label className={'formResponseLabel'}
                               htmlFor="firstname">{(user?.weeklyWorkingTime ?? 0) / 5 / 60} hours</label>
                    </div>
                </div>
                <div className={'annotation'}>
                    Statistics
                </div>
                <div className="infoContainer">
                    {
                        auth.state?.user?.privilegesValue
                            ? !(auth.state.user.privilegesValue & 1) ? (<></>) : (<div className={'statistic-panel'}>
                                <Statistics data={chartState.chart?.data ?? []}
                                            metadata={chartState.chart?.metadata ?? defaultMetadata}/>
                            </div>)
                            : (<></>)
                    }
                </div>

            </form>

            <div className={"editForm"} >
                {
                    auth.state?.user?.privilegesValue
                        ? !(auth.state.user.privilegesValue & 1) ? (<></>) : (<div className={'statistic-panel'}>
                            <TimeTrackerList records={timeTrackerListItems} />
                        </div>)
                        : (<></>)
                }

            </div>
        </div>
    )
}