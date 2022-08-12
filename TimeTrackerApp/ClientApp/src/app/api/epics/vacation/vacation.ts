import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { graphqlRequest } from "../../api";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import {getUserByIdQuery} from "../../../../graphqlQuery/user/userQuery";
import { createVacationTypeAction, getAllVacationsTypeTypeAction, getVacationsByUserIdTypeAction } from "../../../../store/actions/vacation/vacationActions";
import { createVacationQuery, getVacationsByUserIdQuery } from "../../../../graphqlQuery/vacation/vacationQuery";
import { addVacation, setVacation } from "../../../../store/slice/vacation/vacationSlice";


const vacationGetByUserId = (action$: any) => {
    return action$.pipe(
        ofType(getVacationsByUserIdTypeAction),
        mergeMap((action: any) => from(graphqlRequest(getVacationsByUserIdQuery, {
            userId: action.payload
        })).pipe(
            map(response => {
                console.log(response);
              return  setVacation(response.data.fetchAllUserVacationRequests);
            })
        )));
};

const createVacationRequest = (action$:any)=>{
    return action$.pipe(
        ofType(createVacationTypeAction),
        mergeMap((action: any) => from(graphqlRequest(createVacationQuery, {
            model: action.payload
        })).pipe(
            map(response => {
                console.log(response);
              return  addVacation(response.data);
            })
        )));
}

export const vacationEpic = combineEpics(vacationGetByUserId,createVacationRequest);