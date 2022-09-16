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
            <div className={'sick-leaves-container flex-container flex-column w-100'}>

            <div className={'sick-leaves-list flex-container flex-column'}>
                    <table className={'sick-leaves-list-table'}>
                        <thead>
                        <tr>
                            <th>Starting Time</th>
                            <th>Ending Time</th>
                            <th>Count Day</th>
                            <th>User</th>
                            <th >Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requestsVacation.map((item, i) => {
                            const itemToUpdate = {
                                ...item,
                                startingTime: item.startingTime + postFixDate,
                                endingTime: item.endingTime + postFixDate
                            };

                            if (item.isAccepted == null) {
                                return (
                                    <tr key={i} >
                                        <td>{item.startingTime}</td>
                                        <td>{item.endingTime}</td>
                                        <td>{moment.duration(moment(item.endingTime).diff(moment(item.startingTime))).asDays()}</td>
                                        <td >
                                            <div style={{flexGrow: "1", whiteSpace: "nowrap"}}
                                                 onClick={() => navigate("/user/" + item.user?.id)}
                                                 className="button cyan-button close">
                                                {item.user?.firstName} {item.user?.lastName}
                                            </div>
                                            {item.comment !== "" ?
                                                <ShowComment approver={null} comment={item.comment}/> : <></>}
                                        </td>
                                        <td style={{
                                            display: "flex"
                                        }}>
                                            <button className="button silver-button close" onClick={() => {
                                                setEditState(true);
                                                setIdEdit(item.id);
                                            }}>
                                                <FontAwesomeIcon icon={faEdit} className={"icon"}/>
                                            </button>
                                            <button className="button cyan-button close" onClick={() => {
                                                setResponse(true);
                                                setIdEdit(item.id);
                                            }}>Give Response
                                            </button>
                                            <button className="button red-button close" onClick={() => {
                                                dispatch(removeVacationAction(item.id))
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} className={"icon"}/>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            return (<></>);
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );}