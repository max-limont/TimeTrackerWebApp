import {faCheck, faComment, faEdit, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {EditVacation, postFixDate} from "./EditVacation";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {
    getRequestVacationAction,
    removeVacationAction,
    updateVacationAction
} from "../../store/vacation/vacation.slice";
import {GiveResponse} from "./GiveResponse";
import {User} from "../../types/user.types";
import {ShowComment} from "./Vacation";
import {Privileges} from "../../helpers/enums";


export function ManageVacationRequest() {
    const dispatch = useDispatch();
    const [editState, setEditState] = useState(false);
    const [responseState, setResponse] = useState(false);
    const [id, setIdEdit] = useState(0);
    const requestsVacation = useAppSelector(state => state.rootReducer.vacation.requestVacations);
    const auth = useAuth();

    const [visibleComment, setComment] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.state?.user?.id) {
            dispatch(getRequestVacationAction(auth.state?.user?.id));
        }
    }, [auth.state?.user?.id]); 

    return (
        <>

            {responseState ? <GiveResponse stateForm={setResponse} visible={responseState} idVacation={id}/> : <></>}
            {editState ?
                <EditVacation sourceVacation={2} stateForm={setEditState} visible={editState} idVacation={id}/> : <></>}
            <div className="vacation-container">
                <div className="control-panel vacation-control-panel">
                </div>
                <div className="list-vacation-container">
                    <p style={{margin: "5px"}}>Manage Vacations Request</p>
                    <div className="list-vacations">
                        {!(requestsVacation.length == 0) ?
                            <>
                                <div className="vacation-item" style={{textAlign: "center"}}>
                                    <div>Starting Time</div>
                                    <div>Ending Time</div>
                                    <div>Count Day</div>
                                    <div className={"end-item-action"} style={{flexBasis: "250px"}}>User</div>
                                    <div className={"end-item-action"}>Actions</div>
                                </div>
                                {requestsVacation.map((item, i) => {
                                    const itemToUpdate = {
                                        ...item,
                                        startingTime: item.startingTime + postFixDate,
                                        endingTime: item.endingTime + postFixDate
                                    };
                                    if (item.isAccepted == null) {
                                        return (
                                            <div key={i} className="vacation-item">
                                                <div>{item.startingTime}</div>
                                                <div>{item.endingTime}</div>
                                                <div>{moment.duration(moment(item.endingTime).diff(moment(item.startingTime))).asDays()}</div>
                                                <div className={"end-item-action"} style={{flexBasis: "250px"}}>
                                                    <div style={{flexGrow: "1",whiteSpace: "nowrap"}}
                                                         onClick={() => navigate("/user?id=" + item.id)}
                                                         className="button cyan-button close">
                                                        {item.user?.firstName} {item.user?.lastName}
                                                    </div>
                                                    {item.comment!==""? <ShowComment approver={null}   comment={item.comment}/>:<></>}
                                                </div>
                                                <div className={"end-item-action"}>
                                                    <button className="button silver-button close" onClick={() => {
                                                        setEditState(true);
                                                        setIdEdit(item.id);
                                                    }}>
                                                        <FontAwesomeIcon icon={faEdit} className={"icon"}/>
                                                    </button>
                                                    <button className="button cyan-button close" onClick={() => {
                                                        setResponse(true);
                                                        setIdEdit(item.id);
                                                    }}>Give Response</button>
                                                    <button className="button red-button close" onClick={() => {dispatch(removeVacationAction(item.id))}}>
                                                        <FontAwesomeIcon icon={faTrash} className={"icon"}/>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return (<></>);
                                })}
                            </>
                            : <div>You dont have any vacations</div>}
                    </div>
                </div>
            </div>
        </>
    );
}