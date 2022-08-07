import {CSSProperties, FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {deleteRecord} from "../../store/slice/timeTracker/timeTrackerSlice";
import {TimeTrackerDefaultPropsType} from "./Home";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faPenClip, faGears} from "@fortawesome/free-solid-svg-icons";
import {EditRecordForm, EditRecordFormStateType} from "../../store/slice/timeTracker/EditRecordForm";

type TimeTrackerListPropsType = {
    defaultProps: TimeTrackerDefaultPropsType
}

type TimeTrackerListStateType = {
    editRecordFormState: EditRecordFormStateType
}

const initialState: TimeTrackerListStateType = {
    editRecordFormState: {
        visible: false,
        record: null
    }
}

export const TimeTrackerList: FC<TimeTrackerListPropsType> = (props) => {

    const dispatch = useAppDispatch();
    const [state, setState] = useState(initialState);
    const {records} = props.defaultProps
    const recordsInStore = useAppSelector(state => state.rootReducer.timeTracker.records)
    let componentStyle: CSSProperties = {maxWidth: window.innerWidth - 310};

    const editTimeTrackerListItem = (recordId: number) => {
        const record = recordsInStore.find(record => record.id === recordId)
        if (record) {
            setState({...state, editRecordFormState: {...state.editRecordFormState, visible: true, record: record}})
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }
    }

    const removeTimeTrackerListItem = (recordId: number) => {
        dispatch(deleteRecord(recordId));
    }

    return (
        <>
            {state.editRecordFormState.record &&
                <EditRecordForm record={state.editRecordFormState.record}
                                visible={state.editRecordFormState.visible}
                                setVisible={(visible) => setState({...state, editRecordFormState: {...state.editRecordFormState, visible: visible}})}
                />
            }
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
                            <td>{new Date(new Date(record.begin).toLocaleString() + " UTC").toLocaleTimeString()}</td>
                            <td>{new Date(new Date(record.end).toLocaleString() + " UTC").toLocaleTimeString()}</td>
                            <td>{Math.floor(record.duration / 1000 / 3600) < 10 ? `0${Math.floor(record.duration / 1000 / 3600)}` : Math.floor(record.duration / 1000 / 3600)}
                                :{Math.floor(record.duration / 1000 / 60) % 60 < 10 ? `0${Math.floor(record.duration / 1000 / 60) % 60}` : Math.floor(record.duration / 1000 / 60) % 60}
                                :{Math.floor(record.duration / 1000) % 60 < 10 ? `0${Math.floor(record.duration / 1000) % 60}` : Math.floor(record.duration / 1000) % 60}</td>
                            <td>
                                {record.isAutomaticallyCreated ?
                                    <span className={"creation-type-label automatically"}>
                                        <FontAwesomeIcon icon={faGears} className={"icon"} />
                                        Automatically
                                    </span>
                                    :
                                    <span className={"creation-type-label manually"}>
                                        <FontAwesomeIcon icon={faPenClip} className={"icon"} />
                                        Manually
                                    </span>
                                }
                            </td>
                            <td style={{verticalAlign: "top"}}>
                                <div className={"comment-cell"}>
                                    {record.comment?.length && record.comment.length > 0 ? record.comment : '-'}
                                </div>
                            </td>
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
        </>
    )
}