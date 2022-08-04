import {FC} from "react";
import {useActions} from "../../hooks/useActions";
import {useAppSelector} from "../../app/hooks";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {recordToTimeTrackerListItem} from "../../store/slice/timeTracker/timeTrackerSlice";

export const TimeTrackerList: FC = () => {

    const {editRecord, removeRecord, setRecords} = useActions()
    let records = useTypedSelector(state => state.rootReducer.timeTracker.records)
    let timeTrackerListItems = [...records].map(record => recordToTimeTrackerListItem(record));
    timeTrackerListItems = timeTrackerListItems.sort((recordA, recordB) => recordB.date.getTime() - recordA.date.getTime())

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
                        <th className={"last-edited-by"}>Last edited by</th>
                        <th className={"actions"}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                { timeTrackerListItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.date.toLocaleDateString()}</td>
                            <td>{new Date(item.begin).toLocaleTimeString()}</td>
                            <td>{new Date(item.end).toLocaleTimeString()}</td>
                            <td>{Math.floor(item.duration / 1000 / 3600) < 10 ? `0${Math.floor(item.duration / 1000 / 3600)}` : Math.floor(item.duration / 1000 / 3600)}
                                :{Math.floor(item.duration / 1000 / 60) % 60 < 10 ? `0${Math.floor(item.duration / 1000 / 60) % 60}` : Math.floor(item.duration / 1000 / 60) % 60}
                                :{Math.floor(item.duration / 1000) % 3600 < 10 ? `0${Math.floor(item.duration / 1000) % 3600}` : Math.floor(item.duration / 1000) % 3600}</td>
                            <td>{item.comment ?? '-'}</td>
                            <td>{item.editor ? `${item.editor?.firstName} ${item.editor?.lastName}` : 'You'}</td>
                            <td>
                                <a className={"button yellow-button"} onClick={() => editTimeTrackerListItem(item.id ?? -1)}>Edit</a>
                                <a className={"button red-button"} onClick={() => removeTimeTrackerListItem(item.id ?? -1)}>Delete</a>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}