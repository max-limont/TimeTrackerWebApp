import React, {useEffect, useState} from "react";
import {CreateVacation} from "./CreateVacation";
import {EditVacation} from "./EditVacation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faL, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {
    fetchApproversAction,
    getVacationsByUserIdAction,
    removeVacationAction
} from "../../store/vacation/vacation.slice";
import {User} from "../../types/user.types";
import {HubConnection, HubConnectionBuilder} from "@aspnet/signalr";


type Props = {
    approver: User | null,
    comment: string
}

export function ShowComment(prop: Props) {
    const {approver, comment} = prop;
    const [visibleResponse, setResponse] = useState(false);
 
    
    return (
        <>
            {visibleResponse ?
                <>
                    <button onClick={() => {
                        setResponse(!visibleResponse);
                    }} className="button silver-button close">
                        <FontAwesomeIcon icon={faComment} className={"icon"}/>
                    </button>
                    <div className={`form-event-container dark-background ${!visibleResponse && "hidden"}`}>
                        <div className={"form-event"}>
                            <div className={"form-header"}>
                                {prop.approver ? <h2>   {prop.approver.firstName}{" "}{prop.approver.lastName}</h2>
                                    : <></>}
                                <button className={"button red-button close"} onClick={() => {
                                    setResponse(!visibleResponse);
                                }}>
                                    <FontAwesomeIcon icon={faXmark} className={"icon"}/>
                                </button>
                            </div>
                            <div className={"form-group"}>
                                <div>Comment</div>
                                <div className={"form-item w-100"}>
                                    <div>{comment} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : <button onClick={() => {
                    setResponse(!visibleResponse);
                }} className="button silver-button close">
                    <FontAwesomeIcon icon={faComment} className={"icon"}/>
                </button>}

        </>
    );
}

export function Vacation() {
    const dispatch = useDispatch();
    const [createState, setCreateState] = useState(false);
    const [editState, setEditState] = useState(false);
    const approvers = useAppSelector(s => s.rootReducer.vacation.approvers);
    const [visibleApprovers, setApprovers] = useState(false);
    const [id, setIdEdit] = useState(0);
    const vacationsList = useAppSelector(state => state.rootReducer.vacation.vacations);
    const auth = useAuth();
    useEffect(() => {
        const id = auth.state?.user?.id;
        // console.log(auth.state?.user?.roleId);
        if (id) {
            dispatch(getVacationsByUserIdAction(id));
            dispatch(fetchApproversAction(id));
        }
    }, [auth.state?.user]);

    return (
        <>

            {editState ? <EditVacation sourceVacation={undefined} stateForm={setEditState} visible={editState}
                                       idVacation={id}/> : <></>}
            {createState ? <CreateVacation stateForm={setCreateState} visible={createState}/> : <></>}
            <div className="vacation-container">
                <div className="control-panel vacation-control-panel">
                    <div>
                        <button onClick={() => setCreateState(true)} className="button cyan-button">Create Vacation
                            Request
                        </button>
                    </div>
                    <div>
                        <div className={"container-approver"}>
                            <div className={"list-appovers"}>
                                {visibleApprovers ?
                                    <>
                                        <div className={"item header-name"}>
                                            <div>Manager</div>
                                            <div>Email</div>
                                        </div>
                                        {approvers.map(x =>
                                            <div key={x.id} className={"item "}>
                                                <div>{x.firstName}{" "}{x.lastName}</div>
                                                <div> {x.email}</div>
                                            </div>)}
                                    </>
                                    : <></>
                                }
                            </div>
                        </div>
                        <button onClick={() => setApprovers(!visibleApprovers)} className="button cyan-button">Check
                            Approvers
                        </button>
                    </div>
                </div>

                <div className="list-vacation-container">
                    <p style={{margin: "5px", display: "flex"}}>
                        Your Vacations

                    </p>
                    <div className="list-vacations">
                        {!(vacationsList.length == 0) ?
                            <>
                                <div className="vacation-item" style={{textAlign: "center"}}>
                                    <div>Starting Time</div>
                                    <div>Ending Time</div>
                                    <div className={"end-item-action"} style={{flexBasis: "200px"}}>IsAccepted</div>
                                    <div className={"end-item-action"}>Actions</div>
                                </div>
                                {vacationsList.map((item, i) => {

                                    const Comment = (<span className="response-container">
                                                        {item.vacationResponse ?
                                                            item.vacationResponse.comment !== "" ?
                                                                <ShowComment approver={item.vacationResponse?.user}
                                                                             comment={item.vacationResponse.comment}/> : <></>
                                                            : <></>}
                                                    </span>);

                                    return (
                                        <div key={i} className="vacation-item">
                                            <div>{item.startingTime}</div>
                                            <div>{item.endingTime}</div>
                                            <div className={"end-item-action"}
                                                 style={{flexBasis: "200px"}}>{item.isAccepted ? <>
                                                <span className={" button green-button-no-action"}
                                                      style={{flexGrow: "1"}}>Aceppted
                                                </span>
                                                    {Comment}
                                                </>
                                                : item.isAccepted == null ?
                                                    <span className="button yellow-button" style={{flexGrow: "1"}}>Wait for confirmation</span>
                                                    : <><span className={"button red-button"}
                                                              style={{flexGrow: "1"}}>Canceled</span>
                                                        {Comment}</>
                                            }
                                            </div>
                                            <div className={"end-item-action"}>
                                                {item.isAccepted == true ?
                                                    <button className="button cyan-button">You have not any
                                                        action</button>
                                                    :
                                                    <>
                                                        {item.isAccepted == null ?
                                                            <>
                                                                <button onClick={() => {
                                                                    setEditState(true);
                                                                    setIdEdit(item.id);
                                                                }} className="button cyan-button">Edit
                                                                </button>
                                                                <button className={"button red-button close"}
                                                                        onClick={() => dispatch(removeVacationAction(item.id))}>
                                                                    Delete Request
                                                                </button>
                                                            </> :
                                                            <button className={"button red-button close"}
                                                                    onClick={() => dispatch(removeVacationAction(item.id))}>
                                                                Delete Request
                                                            </button>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    );
                                })}
                            </> : <div>You dont have vacations</div>}
                    </div>
                </div>
            </div>
        </>
    );
}