import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {removeVacationAction, updateVacationAction} from "../../store/vacation/vacation.slice";
import { EditVacationType } from "../../types/vacation.types";
import moment from "moment/moment";

export const  postFixDate = "T00:00:00+00:00";

type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
    idVacation: number,
    sourceVacation: number|undefined
}

export function EditVacation(obj: Props) {
    const dispatch = useDispatch();
    const { stateForm, visible, idVacation, sourceVacation } = obj;
    console.log()
    const setVisible = stateForm;
    const [validationError, setError] = useState('');
    const [vacation, setVacation] = useState(sourceVacation ?
         useAppSelector(state => state.rootReducer.vacation.requestVacations.find(item => item.id == idVacation)) 
         : useAppSelector(s => s.rootReducer.vacation.vacations.find(item => item.id == idVacation)));


    function onFinish(e: React.FormEvent) {
        e.preventDefault();
        if (vacation) {
            let accessToQuery = moment(vacation.startingTime).isBefore(moment());
            if(!accessToQuery)
            {
                accessToQuery = moment(vacation.endingTime).isSameOrBefore(moment(vacation.startingTime));
            }
            if(accessToQuery){
                setError("Choose correct date");
            }
            if(!accessToQuery) {
                setVisible(false);
                dispatch(updateVacationAction({
                    id: vacation.id,
                    isAccepted: vacation.isAccepted,
                    comment: vacation.comment,
                    userId: vacation.userId,
                    startingTime: vacation.startingTime + postFixDate,
                    endingTime: vacation.endingTime + postFixDate
                } as EditVacationType));
            }
        }
    }

    if (vacation) {
        const { id, comment, startingTime, endingTime } = vacation;
        return (
            <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
                <div className={"form-event"}>
                    {validationError==""?<></>:validationError}
                    <div className={"form-header"}>
                        <h2>Edit event</h2>
                        <button className={"button red-button close"} onClick={() => {
                            setVisible(false);
                        }}>
                            <FontAwesomeIcon icon={faXmark} className={"icon"} />
                        </button>
                    </div>
                    <form onSubmit={(e) => onFinish(e)}
                          onChange={()=>{
                              setError("");
                          }}>
                        <div className={"form-group"}>
                            <div className={"form-item w-100"}>
                                <label>Starting Time</label>
                                <input  className={validationError!=""?"validation-error color-red":""} type="date" value={startingTime} onChange={(e) => setVacation({ ...vacation, startingTime: e.target.value })} />
                            </div>
                            <div className={"form-item w-100"}>
                                <label>Type Day</label>
                                <input  className={validationError!=""?"validation-error color-red":""} type="date" value={endingTime} onChange={(e) => setVacation({ ...vacation, endingTime: e.target.value })} />
                            </div>
                            
                            <div className={"form-item w-100"}>
                                <label>Comment</label>
                                {!sourceVacation? <textarea defaultValue={comment} onChange={(e) => { setVacation({ ...vacation, comment: e.target.value }) }} />
                            : <label>{comment!==""?comment:"Here isnt comment"}</label>}
                                </div>
                        </div>
                        <button type="submit" className={"button cyan-button"}>Edit</button>
                        <button type="reset" className={"button silver-button"}>Reset</button>
                    </form>
                </div>
            </div>
        );
    }
    return (<></>)
}