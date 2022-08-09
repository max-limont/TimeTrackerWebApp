import {FC, useEffect, useState} from "react";
import {TimeTracker} from "./TimeTracker";
import {TimeTrackerList} from "./TimeTrackerList";
import {useAppDispatch} from "../../app/hooks";
import {fetchAllUserRecords, recordToTimeTrackerListItem} from "../../store/slice/timeTracker/timeTrackerSlice";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {TimeTrackerItem} from "../../type/TimeTracker/timeTracker.types"
import {useAuth} from "../../hooks/useAuth";

export type TimeTrackerDefaultPropsType = {
    records: TimeTrackerItem[],
    lastRecord: TimeTrackerItem
}

export type TimeTrackerDefaultStateType = {
    showContent: boolean
}

const initialState: TimeTrackerDefaultStateType = {
    showContent: false
}

export const Home: FC = () => {

    const dispatch = useAppDispatch()
    const auth = useAuth()
    const [state, setState] = useState(initialState)

    useEffect(() => {
        if (auth.state?.user?.id) {
            dispatch(fetchAllUserRecords(auth.state?.user?.id))
        }
    }, [auth.state?.user?.id])

    let records = useTypedSelector(state => state.rootReducer.timeTracker.records)
    let timeTrackerListItems = [...records].map(record => recordToTimeTrackerListItem(record)).sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime());
    let lastRecord = timeTrackerListItems.filter(record => record.date >= new Date(new Date().setHours(0, 0, 0, 0)))[0] ?? undefined

    useEffect(() => {
        if (auth.state?.user?.id && records && lastRecord) {
            setState({...state, showContent: true})
        }
    }, [])


    return (
        <div className={"flex-container flex-column w-100"}>
            <section className={"time-tracker-container w-100"}>
                <header>
                    <h2>Time Tracker</h2>
                </header>
                <div className={"section-content flex-container flex-column"}>
                    <TimeTracker defaultProps={{records: timeTrackerListItems, lastRecord: lastRecord} as TimeTrackerDefaultPropsType} />
                    <TimeTrackerList defaultProps={{records: timeTrackerListItems, lastRecord: lastRecord} as TimeTrackerDefaultPropsType} />
                </div>
            </section>
        </div>
    ) /*: (
        <div className={"loading-container flex-container flex-column justify-content-center align-items-center w-100 h-fullscreen"} >
            <img src={`${process.env.PUBLIC_URL}/images/loading.jpg`} width={"128px"} height={"128px"} alt="loading" />
        </div>
    )*/
}