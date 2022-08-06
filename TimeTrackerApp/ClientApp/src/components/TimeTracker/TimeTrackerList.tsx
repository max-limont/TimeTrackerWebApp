import {CSSProperties, FC, useEffect} from "react";
import {useAppDispatch} from "../../app/hooks";
import {deleteRecord} from "../../store/slice/timeTracker/timeTrackerSlice";
import {TimeTrackerDefaultPropsType} from "./Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";

type TimeTrackerListPropsType = {
    defaultProps: TimeTrackerDefaultPropsType
}

export const TimeTrackerList: FC<TimeTrackerListPropsType> = (props) => {

    const dispatch = useAppDispatch();
    const { records } = props.defaultProps
    let componentStyle: CSSProperties = { maxWidth: window.innerWidth - 310 };

    const editTimeTrackerListItem = (recordId: number) => {

    }

    const removeTimeTrackerListItem = (recordId: number) => {
        dispatch(deleteRecord(recordId));
    }

    return (
        <div className={"time-tracker-list flex-container flex-column position-relative"} style={componentStyle}>
            <table className={"time-tracker-table"}>
                <thead>
                <tr>
                    <th className={"date"}>Date</th>
                    <th className={"begin"}>Begin</th>
                    <th className={"end"}>End</th>
                    <th className={"duration"}>Duration</th>
                    <th className={"creation-type"}>Creation type</th>
                    <th className={"comment"}>Comment</th>
                    <th className={"last-edited-by"}>Last edited by</th>
                    <th className={"actions"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                { records.length === 0 &&
                    <tr>
                        <td className={"bottom-table-row"} colSpan={8}>
                            <p>
                                <FontAwesomeIcon icon={faCircleInfo} className={"icon"} />
                                The list of your records is empty!
                            </p>
                        </td>
                    </tr>
                }
                { records.map(record => (
                    <tr key={record.id}>
                        <td>{record.date.toLocaleDateString()}</td>
                        <td>{new Date(record.begin).toLocaleTimeString()}</td>
                        <td>{new Date(record.end).toLocaleTimeString()}</td>
                        <td>{Math.floor(record.duration / 1000 / 3600) < 10 ? `0${Math.floor(record.duration / 1000 / 3600)}` : Math.floor(record.duration / 1000 / 3600)}
                            :{Math.floor(record.duration / 1000 / 60) % 60 < 10 ? `0${Math.floor(record.duration / 1000 / 60) % 60}` : Math.floor(record.duration / 1000 / 60) % 60}
                            :{Math.floor(record.duration / 1000) % 3600 < 10 ? `0${Math.floor(record.duration / 1000) % 3600}` : Math.floor(record.duration / 1000) % 3600}</td>
                        <td>
                            {record.isAutomaticallyCreated ?
                                <span className={"automatically"}>Automatically</span>
                                :
                                <span className={"manually"}>Manually</span>
                            }
                        </td>
                        <td>{record.comment?.length && record.comment.length > 0 ? record.comment : '-'}</td>
                        <td>{record.editor ? `${record.editor?.firstName} ${record.editor?.lastName}` : 'You'}</td>
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