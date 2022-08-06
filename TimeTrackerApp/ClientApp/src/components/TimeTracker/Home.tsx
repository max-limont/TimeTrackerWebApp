import {FC, useEffect} from "react";
import {TimeTracker} from "./TimeTracker";
import {TimeTrackerList} from "./TimeTrackerList";
import {useAppDispatch} from "../../app/hooks";
import {getCookie, refreshTokenKey} from "../../Cookie/Cookie";
import {fetchAllUserRecords, recordToTimeTrackerListItem} from "../../store/slice/timeTracker/timeTrackerSlice";
import {parseJwt} from "../../store/parserJWT/parserJWT";
import {AuthUserResponse} from "../../type/User/AuthUser";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {TimeTrackerItem} from "../../type/TimeTracker/timeTracker.types"

export type TimeTrackerDefaultPropsType = {
    records: TimeTrackerItem[],
    lastRecord: TimeTrackerItem
}

export const Home: FC = () => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (getCookie(refreshTokenKey)) {
            dispatch(fetchAllUserRecords(parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId)))
        }
    }, [window.onload])

    let records = useTypedSelector(state => state.rootReducer.timeTracker.records)
    let timeTrackerListItems = [...records].map(record => recordToTimeTrackerListItem(record)).sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime());
    let lastRecord = timeTrackerListItems.filter(record => record.date >= new Date(new Date().setHours(0, 0, 0, 0)))[0] ?? undefined


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
    );
};