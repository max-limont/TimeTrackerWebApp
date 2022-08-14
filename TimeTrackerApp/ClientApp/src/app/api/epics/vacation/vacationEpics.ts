import { combineEpics, ofType } from "redux-observable";
import { from, map, merge, mergeMap } from "rxjs";
import { graphqlRequest } from "../../api";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import { getUserByIdQuery } from "../../../../graphqlQuery/user/userQuery";
import { createVacationTypeAction, getAllVacationsTypeTypeAction, getRequestVacationTypeAction, getVacationsByUserIdTypeAction, removeVacationTypeAction, updateVacationTypeAction } from "../../../../store/actions/vacation/vacationActions";
import { createVacationQuery, getVacationRequestQuery, getVacationsByUserIdQuery, removeVacationQuery, updateVacationQuery } from "../../../../graphqlQuery/vacation/vacationQuery";
import { addVacation, removeVacation, setRequestVacation, setVacation } from "../../../../store/slice/vacation/vacationSlice";
import moment from "moment";
import { VacationType } from "../../../../type/Vacation/VacationsTypes";
import { PayloadAction } from "@reduxjs/toolkit";


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

export const getVacationRequestEpic = (action$: any) => {
    return action$.pipe(
        ofType(getRequestVacationTypeAction),
        mergeMap((action: any) => from(graphqlRequest(getVacationRequestQuery, {
            id: action.payload
        })).pipe(
            map(response => {
                if (response.errors == undefined) {
                    console.log(response);
                    return setRequestVacation(formatDateToNormalFormat(response.data.getRequestVaction));
                }
                throw new Error();
            })
        )));
}

export const removeVacationEpic = (action$: any) => {
    return action$.pipe(
        ofType(removeVacationTypeAction),
        mergeMap((action: PayloadAction<number>) => from(graphqlRequest(removeVacationQuery, {
            id: action.payload
        })).pipe(
            map(response => {
                if (response.errors == undefined) {
                    console.log(response);
                    return removeVacation(response.data.deleteVacationRequest.id);
                }
                throw new Error();
            })
        )))
};

export const updateVacationEpic = (action$:any)=>
action$.pipe(
    ofType(updateVacationTypeAction),
    mergeMap((action: PayloadAction<VacationType>)=>from(graphqlRequest(updateVacationQuery, {
        model: action.payload
    })))
)

export const vacationEpic = combineEpics(vacationGetByUserId, createVacationRequest, getVacationRequestEpic,removeVacationEpic);

