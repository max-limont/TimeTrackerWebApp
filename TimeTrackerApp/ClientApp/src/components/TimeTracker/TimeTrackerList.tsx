import {FC} from "react";
import {useActions} from "../../hooks/useActions";
import {useAppSelector} from "../../app/hooks";
import {useTypedSelector} from "../../hooks/useTypedSelector";

export const TimeTrackerList: FC = () => {

    const {editRecord, removeRecord, setRecords} = useActions()
    let records = useTypedSelector(state => state.rootReducer.timeTracker.records)
    records = [...records].sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime())

    const editTimeTrackerListItem = (recordId: number) => {

    }

    const removeTimeTrackerListItem = (recordId: number) => {
        removeRecord(recordId);
    }

    return (
        <div className={"time-tracker-list"}>
            <table className={"time-tracker-table w-100"}>
                <thead>
                    <tr>
                        <th className={"date"}>Date</th>
                        <th className={"begin"}>Begin</th>
                        <th className={"end"}>End</th>
                        <th className={"duration"}>Duration</th>
                        <th className={"comment"}>Comment</th>
                        <th className={"actions"}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                { records.map(record => (
                        <tr key={record.id}>
                            <td>{record.date.toLocaleDateString()}</td>
                            <td>{new Date(record.begin).toLocaleTimeString()}</td>
                            <td>{new Date(record.end).toLocaleTimeString()}</td>
                            <td>{Math.floor(record.duration / 1000 / 3600) < 10 ? `0${Math.floor(record.duration / 1000 / 3600)}` : Math.floor(record.duration / 1000 / 3600)}
                                :{Math.floor(record.duration / 1000 / 60) % 60 < 10 ? `0${Math.floor(record.duration / 1000 / 60) % 60}` : Math.floor(record.duration / 1000 / 60) % 60}
                                :{Math.floor(record.duration / 1000) % 3600 < 10 ? `0${Math.floor(record.duration / 1000) % 3600}` : Math.floor(record.duration / 1000) % 3600}</td>
                            <td>{record.comment ?? '-'}</td>
                            <td>
                                <a className={"button yellow-button"} onClick={() => editTimeTrackerListItem(record.id ?? -1)}>Edit</a>
                                <a className={"button red-button"} onClick={() => removeTimeTrackerListItem(record.id ?? -1)}>Delete</a>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}