import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { VacationType } from "../../type/Vacation/VacationsTypes";


type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean
}

export function CreateVacation(obj: Props) {
    const setState = obj.stateForm;
    const { visible } = obj;
    const [vacation, setVacation] = useState({} as VacationType);

    function onFinish(e: React.FormEvent) {
        e.preventDefault();
    }
    const { startingTime, endingTime, comment } = vacation
    return (
        <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
            <div className={"form-event"}>
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
                            <input value={endingTime} type="date" onChange={(e) => setVacation({ ...vacation, endingTime: e.target.value })} />
                        </div>
                        <div  className={"form-item w-100"}>
                            <label>Comment</label>
                            <textarea value={comment} onChange={(e) => { setVacation({ ...vacation, comment: e.target.value }) }}></textarea>
                        </div>
                    </div >
                    <button type="submit" className={"button cyan-button"}>Add</button>
                    <button type="reset" className={"button red-button"}>Reset</button>

                </form>
            </div>
        </div>);
}