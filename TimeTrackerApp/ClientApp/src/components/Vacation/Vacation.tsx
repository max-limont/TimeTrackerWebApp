import React, { useEffect, useState } from "react";
import { CreateVacation } from "./CreateVacation";
import { EditVacation } from "./EditVacation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { getVacationsByUserIdAction, removeVacationAction } from "../../store/vacation/vacation.slice";



export function Vacation() {
    const dispatch = useDispatch();
    const [createState, setCreateState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [id, setIdEdit] = useState(0);
    const vacationsList = useAppSelector(state => state.rootReducer.vacation.vacations);
    const auth = useAuth();
    useEffect(() => {
        const id = auth.state?.user?.id;
        // console.log(auth.state?.user?.roleId);
        if (id) {
            dispatch(getVacationsByUserIdAction(id))
        }
    }, [auth.state?.user]);



    return (
        <>
            {editState ? <EditVacation stateForm={setEditState} visible={editState} idVacation={id} /> : <></>}
            {createState ? <CreateVacation stateForm={setCreateState} visible={createState} /> : <></>}
            <div className="vacation-container">
                <div className="control-panel vacation-control-panel">
                    <div>
                        <button onClick={() => setCreateState(true)} className="button cyan-button">Create Vacation Request</button>
                    </div>
                </div>
                <div className="list-vacation-container">
                    <p style={{ margin: "5px" }}>Your Vacations</p>
                    <div className="list-vacations">
                        {!(vacationsList.length == 0) ?
                            <>
                                <div className="vacation-item" style={{ textAlign: "center" }}>
                                    <div>Starting Time</div>
                                    <div>Ending Time</div>
                                    <div>IsAccepted</div>
                                    <div className={"end-item-action"}>Actions</div>
                                </div>
                                {vacationsList.map((item, i) => {
                                    return (
                                        <div key={i} className="vacation-item">
                                            <div>{item.startingTime}</div>
                                            <div>{item.endingTime}</div>
                                            <div>{item.isAccepted ? <span className={" button green-button"} >Aceppted</span>
                                                : item.isAccepted == null ?
                                                    <span className=" button yellow-button">Wait for confirmation</span>
                                                    : <span  className={"button red-button"} >Canceled</span>
                                            }</div>
                                            <div className={"end-item-action"} ><button onClick={() => {
                                                setEditState(true);
                                                setIdEdit(item.id)
                                            }} className="button cyan-button">Edit</button>
                                                <button className={"button red-button close"} onClick={() =>
                                                    dispatch(removeVacationAction(item.id))} >
                                                    <FontAwesomeIcon icon={faXmark} className={"icon"} />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </> : <div>You dont have vacations</div>}
                    </div>
                </div>
            </div>
        </>);
}