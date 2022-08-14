import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { removeVacationAction, updateVacationAction } from "../../store/actions/vacation/vacationActions";


export const  postFixDate = "T00:00:00+00:00";
type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
    idVacation: number,
    sourceVacation?: any
}

export function EditVacation(obj: Props) {
    const dispatch = useAppDispatch();
    const { stateForm, visible, idVacation,sourceVacation } = obj;
    const setVisible = stateForm;
    const [vacation, setVacation] = useState(
        sourceVacation==undefined?useAppSelector(s => s.rootReducer.vacation.vacations.find(item => item.id == idVacation))
        :useAppSelector(s => s.rootReducer.vacation.requestVacations.find(item => item.id == idVacation)));


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
                                <textarea value={comment} onChange={(e) => { setVacation({ ...vacation, comment: e.target.value }) }}></textarea>
                            </div>
                        </div>
                        <button type="submit" className={"button cyan-button"}>Edit</button>
                        <button className={"button red-button"} onClick={(e) => {
                            e.preventDefault();
                            dispatch(removeVacationAction(id))
                        }
                        }>Remove</button>
                        <button type="reset" className={"button silver-button"}>Reset</button>
                    </form>
                </div>
            </div>
        );
    }
    return (<></>)
}