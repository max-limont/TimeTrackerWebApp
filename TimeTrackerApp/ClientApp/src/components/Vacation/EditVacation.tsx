import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";

type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
    idVacation: number,
}

export function EditVacation(obj: Props) {
    const { stateForm, visible, idVacation } = obj;
    const setVisible = stateForm;
    const [vacation, setVacation] = useState(useAppSelector(s => s.rootReducer.vacation.vacations.find(item => item.id == idVacation)));
    console.log(idVacation);
    function onFinish(e: React.FormEvent) {
        e.preventDefault();
    }
    if (vacation) {
        const { id, comment, startingTime, endingTime } = vacation
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
                            // dispatch(removeVacationAction(id))
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