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
    const [vacations, setVacation] = useState(vacationsList);
    const [filterState, setFilterState]: any = useState('');
    const auth = useAuth();
    const filterVacationsByAcceptState = (state: string | boolean | null) => {
        setFilterState(state);
        console.log(state);
        switch (state) {
            case "": {
                setVacation(vacationsList);
                break
            }
            case true: {
                console.log(state);
                setVacation(vacationsList.filter(x => x.isAccepted == true));
                break;
            }
            case false: {
                setVacation(vacationsList.filter(x => x.isAccepted == false));
                break;
            }
            case null: {
                setVacation(vacationsList.filter(x => x.isAccepted == null));
                break;
            }
        }
    }
    useEffect(() => {
        const id = auth.state?.user?.id;
        // console.log(auth.state?.user?.roleId);
        if (id) {
            dispatch(getVacationsByUserIdAction(id));
            dispatch(fetchApproversAction(id));
        }
    }, [auth.state?.user]);
    
    useEffect(() => {
        filterVacationsByAcceptState(filterState);
    }, [vacationsList]);

    return (
        <>

            {editState ? <EditVacation sourceVacation={undefined} stateForm={setEditState} visible={editState}
                                       idVacation={id}/> : <></>}
            {createState ? <CreateVacation stateForm={setCreateState} visible={createState}/> : <></>}

            <div className="vacation-container">

                <div className={'sick-leaves-panel flex-container'}>
                    <nav>
                        <a className={`${filterState === '' ? 'active' : ''}`}
                           onClick={() => filterVacationsByAcceptState("")}>All</a>
                        <a className={`${filterState === true ? 'active' : ''}`}
                           onClick={() => filterVacationsByAcceptState(true)}>Accepted</a>
                        <a className={`${filterState === false ? 'active' : ''}`}
                           onClick={() => filterVacationsByAcceptState(false)}>Rejected</a>
                        <a className={`${filterState === null ? 'active' : ''}`}
                           onClick={() => filterVacationsByAcceptState(null)}>Waiting Confirm</a>

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
                        </div>
                    </nav>
                    <div>
                        <a className={'button cyan-button'} onClick={() => setApprovers(!visibleApprovers)}>Check
                            Approvers
                        </a> 
                        <a style={{marginLeft:"5px"}} className={'button cyan-button'} onClick={() => setCreateState(true)}>Create Vacation
                            Request
                        </a>
                    </div>
                </div>
                <div className={'sick-leaves-container flex-container flex-column w-100'}>
                    <div className={'sick-leaves-list flex-container flex-column'}>
                        <table className={'sick-leaves-list-table'}>
                            <thead>
                            <tr>
                                <th>Starting Time</th>
                                <th>Ending Time</th>
                                <th>IsAccepted</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {vacations.map((item, i) => {

                                const Comment = (<span className="response-container">
                                                        {item.vacationResponse ?
                                                            item.vacationResponse.comment !== "" ?
                                                                <ShowComment approver={item.vacationResponse?.user}
                                                                             comment={item.vacationResponse.comment}/> : <></>
                                                            : <></>}
                                                    </span>);

                                return (
                                    <tr key={i}>
                                        <td>{item.startingTime}</td>
                                        <td>{item.endingTime}</td>
                                        <td>{item.isAccepted ? <>
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
                                        </td>
                                        <td>
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
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}