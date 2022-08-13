import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { graphqlRequest } from "../../api";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import { getUserByIdQuery } from "../../../../graphqlQuery/user/userQuery";
import { createVacationTypeAction, getAllVacationsTypeTypeAction, getVacationsByUserIdTypeAction } from "../../../../store/actions/vacation/vacationActions";
import { createVacationQuery, getVacationsByUserIdQuery } from "../../../../graphqlQuery/vacation/vacationQuery";
import { addVacation, setVacation } from "../../../../store/slice/vacation/vacationSlice";
import moment from "moment";
import { VacationType } from "../../../../type/Vacation/VacationsTypes";


function formatDateToNormalFormat(array: VacationType[]) {
    return array.map(item => {
        console.log(item.endingTime);
        return {
            ...item,
            endingTime: moment(item.endingTime).format("yyyy-MM-DD"),
            startingTime: moment(item.startingTime).format("yyyy-MM-DD"),
        }
    });
};

const vacationGetByUserId = (action$: any) => {
    return action$.pipe(
        ofType(getVacationsByUserIdTypeAction),
        mergeMap((action: any) => from(graphqlRequest(getVacationsByUserIdQuery, {
            userId: action.payload
        })).pipe(
            map(response => {
                console.log(response);
                return setVacation(formatDateToNormalFormat(response.data.fetchAllUserVacationRequests));
            })
        )));
};

const createVacationRequest = (action$: any) => {
    return action$.pipe(
        ofType(createVacationTypeAction),
        mergeMap((action: any) => from(graphqlRequest(createVacationQuery, {
            model: action.payload
        })).pipe(
            map(response => {
                console.log(response);
                const model: VacationType = response.data.createVacationRequest;
                return addVacation({
                    ...model,
                    startingTime: moment(model.startingTime).format("yyyy-MM-DD"),
                    endingTime: moment(model.endingTime).format("yyyy-MM-DD")
                });
            })
        )));
}

export const vacationEpic = combineEpics(vacationGetByUserId, createVacationRequest);