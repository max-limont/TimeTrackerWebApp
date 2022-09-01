import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { CreateVacationType } from "../../types/vacation.types";
import { postFixDate } from "./EditVacation";
import {useDispatch} from "react-redux";
import {createVacationAction} from "../../store/vacation/vacation.slice";


type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean
}

export function CreateVacation(obj: Props) {
    const dispatch = useDispatch();
    const setState = obj.stateForm;
    const { visible } = obj;
    const auth = useAuth();
    const [validationError, setError] = useState('');
    const [vacation, setVacation] = useState({
        userId: auth.state?.user?.id,
        startingTime: moment().format("yyyy-MM-DD"),
        endingTime: moment().add("day", 1).format("yyyy-MM-DD")
    } as CreateVacationType);

    function onFinish(e: React.FormEvent) {
        e.preventDefault();
        console.log(vacation);
        let accessToQuery = moment(startingTime).isBefore(moment());
        if(!accessToQuery)
        {
            accessToQuery = moment(endingTime).isSameOrBefore(moment(startingTime));
        }
        if(accessToQuery){
            setError("Choose correct date");
        } 
        if(!accessToQuery){
            dispatch(createVacationAction({
                ...vacation,
                startingTime: vacation.startingTime + postFixDate,
                endingTime: vacation.endingTime + postFixDate
            }));
            setState(false);
        }
     
    }

    const { startingTime, endingTime, comment } = vacation

    return (
        <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
            <div className={"form-event"}>
                {validationError==""?<></>:validationError}
                <div className={"form-header"}>
                    <h2>Create vacation</h2>
                    <button className={"button red-button close"} onClick={() => setState(false)}>
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </button>
                </div>
                <form onSubmit={(e) => onFinish(e)} >
                    <div className={"form-group"}>
                        <div className={"form-item w-100"}>
                            <label>Starting Time</label>
                            <input value={startingTime} type="date" onChange={(e) => setVacation({ ...vacation, startingTime: e.target.value })} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Ending Time</label>
                            <input value={endingTime} type="date" onChange={event => setVacation({...vacation, endingTime: event.target.value})} />
                        </div>
                        <div className={"form-item w-100"}>
                            <label>Comment</label>
                            <textarea className="text-area-form" defaultValue={comment} onChange={event => setVacation({...vacation, comment: event.target.value})} />
                        </div>
                    </div>
                    <button type="submit" className={"button cyan-button"}>Add</button>
                    <button type="reset" className={"button red-button"}>Reset</button>
                </form>
            </div>
        </div>
    )
}