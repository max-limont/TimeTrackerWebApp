import { faCheck, faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { EditVacation, postFixDate } from "./EditVacation";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getRequestVacationAction, updateVacationAction} from "../../store/vacation/vacation.slice";


export function ManageVacationRequest() {
    const dispatch = useDispatch();
    const [editState, setEditState] = useState(false);
    const [id, setIdEdit] = useState(0);
    const requestsVacation = useAppSelector(state => state.rootReducer.vacation.requestVacations);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.state?.user) {
            dispatch(getRequestVacationAction(auth.state?.user?.id));
        }
       
    }, [auth.state?.user]);
    
    return (
        <>
            {editState ? <EditVacation sourceVacation={2} stateForm={setEditState} visible={editState} idVacation={id} /> : <></>}
            <div className="vacation-container">
                <div className="control-panel vacation-control-panel">
                </div>
                <div className="list-vacation-container">
                    <p style={{margin: "5px"}}>Manage Vacations Request</p>
                    <div className="list-vacations">
                        {!(requestsVacation.length == 0) ?
                            <>
                                <div className="vacation-item" style={{ textAlign: "center" }}>
                                    <div style={{
                                        flexBasis: "20px"
                                    }}>№</div>
                                    <div>Starting Time</div>
                                    <div>Ending Time</div>
                                    <div>Count Day</div>
                                    <div>User</div>
                                    <div className={"end-item-action"}>Actions</div>
                                </div>
                                {requestsVacation.map((item, i) => {
                                    const itemToUpdate= {
                                        ...item,
                                        startingTime: item.startingTime + postFixDate,
                                        endingTime: item.endingTime + postFixDate,
                                        
                                    };
                                    return (
                                        <div key={i} className="vacation-item">
                                            <div style={{
                                                flexBasis: "20px"
                                            }}>{i + 1}</div>
                                            <div>{item.startingTime}</div>
                                            <div>{item.endingTime}</div>
                                            <div>{moment.duration(moment(item.endingTime).diff(moment(item.startingTime))).asDays()}</div>
                                            <div>{item.user?.firstName} {item.user?.lastName}</div>
                                            <div className={"end-item-action"} >
                                                <button className="button cyan-button close" onClick={() => {
                                                    setEditState(true);
                                                    setIdEdit(item.id);
                                                }}>
                                                    <FontAwesomeIcon icon={faEdit} className={"icon"} />
                                                </button>
                                                <button className={"button orange-button close"} onClick={() =>
                                                    dispatch(updateVacationAction({...itemToUpdate, isAccepted: false }))}>
                                                    <FontAwesomeIcon icon={faXmark} className={"icon"} />
                                                </button>
                                                <button className="button green-button close" onClick={() => {
                                                    dispatch(updateVacationAction({...itemToUpdate, isAccepted: true }));
                                                }}>
                                                    <FontAwesomeIcon icon={faCheck} className={"icon"} />
                                                </button>
                                                <button className="button red-button close" onClick={() => {
                                                }}>
                                                    <FontAwesomeIcon icon={faTrash} className={"icon"} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </>
                            : <div>You dont have any vacations</div>}
                    </div>
                </div>
            </div>
        </>
    );
}