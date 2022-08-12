import React, { useState } from "react";
import {useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeVacation } from "../../store/slice/vacation/vacationSlice";
import { CreateVacation } from "./CreateVacation";
import { EditVacation } from "./EditVacation";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faClock, faClose, faTimes, faXmark} from "@fortawesome/free-solid-svg-icons";


export function Vacation() {
    const dispatch = useAppDispatch();
    const [createState, setCreateState] = useState(false);
    const [editState, setEditState] = useState(false);
    const [id, setIdEdit] = useState(0);
    const vacationsList = useAppSelector(s => s.rootReducer.vacation.vacations);
    

    return (
        <>
            {editState ? <EditVacation stateForm={setEditState} visible={editState} idVacation={id} /> : <></>}
            {createState ? <CreateVacation stateForm={setCreateState} visible={createState} /> : <></>}
            <div className="vacation-container">
                <div className="control-panel vacation-control-panel">
                    <div>
                        <button onClick={() => setCreateState(true)} className="button cyan-button">CreateVacation</button>
                    </div>
                    <div>
                        <button className="button cyan-button">Manage Requests Vacations</button>
                    </div>
                </div>
                <div className="list-vacation-container">
                    <p>Your Vacations</p>
                    
                    <div className="list-vacations">
                        {!(vacationsList.length == 0) ?
                            <>
                                <div className="vacation-item" style={{textAlign: "center"}}>
                                    <div>Starting Time</div>
                                    <div>Ending Time</div>
                                    <div>IsAccepted</div>
                                    <div className={"end-item-action"}>Actions</div>
                                </div>
                            {vacationsList.map((item,i) => {
                                return (
                                        <div key={i} className="vacation-item">
                                            <div>{item.startingTime}</div>
                                            <div>{item.endingTime}</div>
                                            <div>{item.isAccepted ? <FontAwesomeIcon icon={faClose} className={"icon"} />
                                                : item.isAccepted==null?
                                                <FontAwesomeIcon icon={faClock} className={"icon"} />
                                                :   <FontAwesomeIcon icon={faBan} className={"icon"} />
                                            }</div>
                                            <div className={"end-item-action"} ><button onClick={()=>{
                                                setEditState(true);
                                                setIdEdit(item.id)}} className="button cyan-button">Edit</button>
                                                <button onClick={()=>dispatch(removeVacation(item.id))} className="button cyan-button">Delete</button></div>
                                        </div>
                                );
                            })}
                            </>
                            : <div>You dont have vacations</div>}
                    </div>
                </div>
            </div>
        </>);
}