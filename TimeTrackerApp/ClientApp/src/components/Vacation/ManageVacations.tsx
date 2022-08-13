import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useAuth } from "../../hooks/useAuth";
import { getRequestVacationAction } from "../../store/actions/vacation/vacationActions";


export function ManageVacationRequest() {
    const dispatch = useAppDispatch();
    const requestsVacation = useAppSelector(s => s.rootReducer.vacation.requestVacations);
    const auth = useAuth();
    const vacationLevel = useAppSelector(s => s.rootReducer.vacationLevel.vacationLevels.find(x => x.id == auth.state?.user?.vacationPermissionId));
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.state?.user) {
            dispatch(getRequestVacationAction(auth.state?.user?.id));
        }
        if (vacationLevel ? vacationLevel.value <= 1 ? true : false : false) {
            navigate("/vacation");
        }
    });
    return (
        <div className="vacation-container">
            <div className="control-panel vacation-control-panel">
            </div>
            <div className="list-vacation-container">
                <p>Manage Vacations Request</p>

                <div className="list-vacations">
                    {!(requestsVacation.length == 0) ?
                        <>
                            <div className="vacation-item" style={{ textAlign: "center" }}>
                                <div style={{
                                    flexBasis: "10px"
                                }}>№</div>
                                <div>Starting Time</div>
                                <div>Ending Time</div>
                                <div>Count Day</div>
                                <div>User</div>
                                <div className={"end-item-action"}>Actions</div>
                            </div>
                            {requestsVacation.map((item, i) => {
                                return (
                                    <div key={i} className="vacation-item">
                                        <div style={{
                                            flexBasis: "10px"
                                        }}>{i+1}</div>
                                        <div>{item.startingTime}</div>
                                        <div>{item.endingTime}</div>
                                        <div>{moment.duration(moment(item.endingTime).diff(moment(item.startingTime))).asDays()}</div>
                                        <div>{item.user?.firstName} {item.user?.lastName}</div>
                                        <div className={"end-item-action"} ><button className="button cyan-button">Cancel</button></div>
                                    </div>
                                );
                            })}
                        </>
                        : <div>You dont have vacations</div>}
                </div>
            </div>
        </div>
    );
}