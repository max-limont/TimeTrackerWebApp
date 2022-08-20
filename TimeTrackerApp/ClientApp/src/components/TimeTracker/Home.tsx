import {FC, useEffect, useState} from "react";
import {TimeTracker} from "./TimeTracker";
import {TimeTrackerList} from "./TimeTrackerList";
import {recordToTimeTrackerListItem} from "../../store/timeTracker/timeTracker.slice";
import {TimeTrackerItem} from "../../types/timeTracker.types"
import {useAuth} from "../../hooks/useAuth";
import {ContentStateType} from "../Layout/Content";
import {Loading} from "../Layout/Loading";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";

export type TimeTrackerDefaultPropsType = {
    records: TimeTrackerItem[],
    lastRecord: TimeTrackerItem
}

const initialState: ContentStateType = {
    showContent: false
}

export const Home: FC = () => {

    const dispatch = useDispatch()
    const [state, setState] = useState(initialState)
    const auth = useAuth()
    let records = useAppSelector(state => state.rootReducer.timeTracker.records)
    let timeTrackerListItems = [...records].map(record => recordToTimeTrackerListItem(record)).sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime());
    let lastRecord = timeTrackerListItems.filter(record => record.date >= new Date(new Date().setHours(0, 0, 0, 0)))[0] ?? undefined

    useEffect(() => {
        if (auth.state?.user && (records || lastRecord)) {
            setState({...state, showContent: true})
        }
    }, [auth])

    return state.showContent ? (
        <div className={"flex-container flex-column w-100"}>
            <section className={"time-tracker-container w-100"}>
                <div className={"section-content flex-container flex-column"}>
                    <TimeTracker defaultProps={{records: timeTrackerListItems, lastRecord: lastRecord} as TimeTrackerDefaultPropsType} />
                    <TimeTrackerList defaultProps={{records: timeTrackerListItems, lastRecord: lastRecord} as TimeTrackerDefaultPropsType} />
                </div>
            </section>
        </div>
    ) : (
        <Loading />
    )
}