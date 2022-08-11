import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { CreateVacation } from "./CreateVacation";
import { EditVacation } from "./EditVacation";


export function Vacation() {
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
                            vacationsList.map((item,i) => {
                                return (
                                        <div key={i} className="vacation-item">
                                            <div>{item.startingTime}</div>
                                            <div>{item.endingTime}</div>
                                            <div>{item.isAccepted ? <>Accepted</> : <>Is not Accepted</>}</div>
                                            <div><button onClick={()=>{
                                                setEditState(true);
                                                setIdEdit(item.id)}} className="button cyan-button">Edit</button></div>
                                        </div>
                                    
                                );
                            })
                            : <div>You dont have vacations</div>}
                    </div>
                </div>
            </div>
        </>);
}