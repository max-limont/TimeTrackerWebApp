import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {removeVacationAction, updateVacationAction} from "../../store/vacation/vacation.slice";

export const  postFixDate = "T00:00:00+00:00";

type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
    idVacation: number,
    sourceVacation?: any
}

export function EditVacation(obj: Props) {
    const dispatch = useDispatch();
    const { stateForm, visible, idVacation, sourceVacation } = obj;
    const setVisible = stateForm;
    const [vacation, setVacation] = useState(sourceVacation ? useAppSelector(state => state.rootReducer.vacation.vacations.find(item => item.id == idVacation)) : useAppSelector(s => s.rootReducer.vacation.requestVacations.find(item => item.id == idVacation)));


    function onFinish(e: React.FormEvent) {
        e.preventDefault();
        if (vacation) {
            dispatch(updateVacationAction({
                ...vacation,
                startingTime: vacation.startingTime + postFixDate,
                endingTime: vacation.endingTime + postFixDate
            }));
        }
        setVisible(false);
    }

    if (vacation) {
        const { id, comment, startingTime, endingTime } = vacation;
        return (
            <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
                <div className={"form-event"}>
                    <div className={"form-header"}>
                        <h2>Edit event</h2>
                        <button className={"button red-button close"} onClick={() => {
                            setVisible(false);
                        }}>
                            <FontAwesomeIcon icon={faXmark} className={"icon"} />
                        </button>
                    </div>
                    <form onSubmit={(e) => onFinish(e)}>
                        <div className={"form-group"}>
                            <div className={"form-item w-100"}>
                                <label>Starting Time</label>
                                <input type="date" value={startingTime} onChange={(e) => setVacation({ ...vacation, startingTime: e.target.value })} />
                            </div>
                            <div className={"form-item w-100"}>
                                <label>Type Day</label>
                                <input type="date" value={endingTime} onChange={(e) => setVacation({ ...vacation, endingTime: e.target.value })} />
                            </div>
                            <div className={"form-item w-100"}>
                                <label>Comment</label>
                                <textarea defaultValue={comment} onChange={(e) => { setVacation({ ...vacation, comment: e.target.value }) }} />
                            </div>
                        </div>
                        <button type="submit" className={"button cyan-button"}>Edit</button>
                        <button className={"button red-button"} onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeVacationAction(id))
                        }}>
                            Remove
                        </button>
                        <button type="reset" className={"button silver-button"}>Reset</button>
                    </form>
                </div>
            </div>
        );
    }
    return (<></>)
}