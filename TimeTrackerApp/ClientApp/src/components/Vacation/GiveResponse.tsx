import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { time } from "console";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAuth } from "../../hooks/useAuth";
import { createResponseAction, updateVacationAction } from "../../store/vacation/vacation.slice";
import { VacationResponse } from "../../types/vacation.types";


type Props = {
    stateForm: React.Dispatch<React.SetStateAction<boolean>>,
    visible: boolean,
    idVacation: number
}

export function GiveResponse(obj: Props) {
    const dispatch = useDispatch();
    const { stateForm, visible, idVacation } = obj;
    const vacation = useAppSelector(s => s.rootReducer.vacation.requestVacations.find(x => x.id == idVacation))
    const setVisible = stateForm;
    const auth = useAuth();
    const [acceptState, setStateAccept] = useState(false);
    const [response, setResponse] = useState({
        vacationId: vacation?.id,
        userId: auth.state?.user?.id,
        comment: "",
        id: 0
    } as VacationResponse);

    useEffect(() => {
        if (vacation)
            setVisible(visible);
    })

    const onFinish = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createResponseAction({
            stateAccepte: acceptState,
            response: response 
        }));
    }
    const { comment } = response;

    return (
        <div className={`form-event-container dark-background ${!visible && "hidden"}`}>
            <div className={"form-event"}>
                <div className={"form-header"}>
                    <h2>Response</h2>
                    <button className={"button red-button close"} onClick={() => {
                        setVisible(false);
                    }}>
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </button>
                </div> 
                <form onSubmit={(e) => onFinish(e)}>
                    <div className={"form-group"}>
                        <div className={"form-item w-100"}>
                            <label>Comment (optional)</label>
                            <textarea value={comment} onChange={(e) => setResponse({ ...response, comment: e.target.value })} />
                        </div>
                    </div>
                    <button onClick={()=>{
                        setStateAccept(false);
                    }} type={"submit"} className={"button yellow-button close"} >
                        <FontAwesomeIcon icon={faXmark} className={"icon"} />
                    </button>
                    <button  onClick={()=>{
                        setStateAccept(true);
                    }}  type={"submit"} className="button green-button close" >
                        <FontAwesomeIcon icon={faCheck} className={"icon"} />
                    </button>

                </form>

            </div>
        </div>
    );
}