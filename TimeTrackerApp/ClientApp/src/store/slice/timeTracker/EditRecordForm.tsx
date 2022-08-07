import React, {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGears, faPenClip, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch} from "../../../app/hooks";
import {Record} from "../../../type/TimeTracker/timeTracker.types";
import {parseJwt} from "../../parserJWT/parserJWT";
import {AuthUserResponse} from "../../../type/User/AuthUser";
import {getCookie, refreshTokenKey} from "../../../Cookie/Cookie";
import {updateRecord} from "./timeTrackerSlice";

type EditRecordFormPropsType = {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    record: Record
}

export type EditRecordFormStateType = {
    visible: boolean,
    record: Record | null
}

type EditRecordFormFieldsStateType = {
    comment?: string | null
}

let initialState: EditRecordFormFieldsStateType = {
    comment: ""
}

export const EditRecordForm: FC<EditRecordFormPropsType> = (props) => {

    const dispatch = useAppDispatch();
    const { record, visible, setVisible } = props;
    if (record) {
        initialState = {...initialState, comment: record.comment}
    }
    const [state, setState] = useState(initialState)
    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const editedRecord = {
            id: record.id,
            workingTime: record.workingTime,
            createdAt: record.createdAt,
            editorId: parseInt(parseJwt<AuthUserResponse>(getCookie(refreshTokenKey)).UserId),
            employeeId: record.employeeId,
            isAutomaticallyCreated: record.isAutomaticallyCreated,
            comment: state.comment
        } as Record
        dispatch(updateRecord(editedRecord));
        setState({comment: ''})
        setVisible(false);
        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
    }


    return (
        <div className={`form-container dark-background ${!visible && "hidden"}`}>
            <div className={"edit-record-form"}>
                <div className={"form-header"}>
                    <h2>Edit record</h2>
                    <button className={"button red-button close"} onClick={() => {
                        setVisible(false)
                        document.getElementsByTagName('body')[0].attributes.removeNamedItem('style');
                    }}>
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </button>
                </div>
                <form onSubmit={(event) => onSubmit(event)}>
                    <div className={"form-group"}>
                        <div className={"form-item"}>
                            <label>Date:</label>
                            <span>{record.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className={"form-item"}>
                            <label>Begin:</label>
                            <span>{new Date(new Date(record.createdAt.getTime()).toLocaleString() + " UTC").toLocaleTimeString()}</span>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={"form-item"}>
                            <label>End:</label>
                            <span>{new Date(new Date(record.createdAt.getTime() + record.workingTime).toLocaleString() + " UTC").toLocaleTimeString()}</span>
                        </div>
                        <div className={"form-item"}>
                            <label>Duration:</label>
                            <span>
                                {Math.floor(record.workingTime / 1000 / 3600) < 10 ? `0${Math.floor(record.workingTime / 1000 / 3600)}` : Math.floor(record.workingTime / 1000 / 3600)}
                                :{Math.floor(record.workingTime / 1000 / 60) % 60 < 10 ? `0${Math.floor(record.workingTime / 1000 / 60) % 60}` : Math.floor(record.workingTime / 1000 / 60) % 60}
                                :{Math.floor(record.workingTime / 1000) % 60 < 10 ? `0${Math.floor(record.workingTime / 1000) % 60}` : Math.floor(record.workingTime / 1000) % 60}
                            </span>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={"form-item w-100 creation-type"}>
                            <label>Creation type:</label>
                            <span>
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
                            </span>
                        </div>
                    </div>
                    <div className={"form-group"}>
                        <div className={"form-item flex-wrap w-100"}>
                            <label>Comment:</label>
                            <textarea defaultValue={record.comment ?? undefined} onChange={event => setState({...state, comment: event.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className={"button yellow-button"}>Save</button>
                </form>
            </div>
        </div>
    )
}