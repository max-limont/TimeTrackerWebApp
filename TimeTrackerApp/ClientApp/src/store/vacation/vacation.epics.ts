import {combineEpics, Epic, ofType} from "redux-observable";
import { from, map, mergeMap, Observable } from "rxjs";
import { graphqlRequest } from "../../graphql/api";
import { createVacationQuery, getVacationRequestQuery, getVacationsByUserIdQuery, removeVacationQuery, updateVacationQuery } from "../../graphql/queries/vacation.queries";
import {
    addVacation,
    removeRequestVacation,
    updateVacation,
    updateRequestVacation,
    removeVacation,
    setRequestVacation,
    setVacation,
    getVacationsByUserIdAction,
    createVacationAction,
    getRequestVacationAction,
    removeVacationAction,
    updateVacationAction
} from "./vacation.slice";
import moment from "moment";
import { VacationType } from "../../types/vacation.types";
import { PayloadAction } from "@reduxjs/toolkit";
import { state, store } from "../store";


function formatDateToNormalFormat(array: VacationType[]) {
    return array.map(item => {
        return {
            ...item,
            endingTime: moment(item.endingTime).format("yyyy-MM-DD"),
            startingTime: moment(item.startingTime).format("yyyy-MM-DD"),
        }
    });
}

const getVacationsByUserIdEpic: Epic = (action$: Observable<ReturnType<typeof getVacationsByUserIdAction>>): any => {
    return action$.pipe(
        ofType(getVacationsByUserIdAction.type),
        mergeMap(action => from(graphqlRequest(getVacationsByUserIdQuery, {
            userId: action.payload
        })).pipe(
            map(response => {
                return setVacation(formatDateToNormalFormat(response.data.fetchAllUserVacationRequests));
            })
        ))
    )
};

const createVacationRequestEpic: Epic = (action$: Observable<ReturnType<typeof createVacationAction>>): any => {
    return action$.pipe(
        ofType(createVacationAction.type),
        mergeMap(action => from(graphqlRequest(createVacationQuery, {
            model: action.payload
        })).pipe(
            map(response => {
                const model: VacationType = response.data.createVacationRequest;
                return addVacation({
                    ...model,
                    startingTime: moment(model.startingTime).format("yyyy-MM-DD"),
                    endingTime: moment(model.endingTime).format("yyyy-MM-DD")
                });
            })
        )));
};

export const getVacationRequestEpic = (action$:Observable<ReturnType<typeof getRequestVacationAction>>) => {
    return action$.pipe(
        ofType(getRequestVacationAction.type),
        mergeMap((action:PayloadAction<number>)=> from(graphqlRequest(getVacationRequestQuery, {
            id: action.payload
        })).pipe(
            map(response => {
                console.log(response);
                if (!response?.errors) {
                    return setRequestVacation(formatDateToNormalFormat(response.data.getRequestVaction));
                }
                throw new Error();
            })
        ))
    )
};

export const removeVacationEpic: Epic = (action$: Observable<ReturnType<typeof removeVacationAction>>): any => {
    return action$.pipe(
        ofType(removeVacationAction.type),
        mergeMap(action => from(graphqlRequest(removeVacationQuery, {
            id: action.payload
        })).pipe(
            map(response => {
                if (!response?.errors) {
                    const userId = store.getState().rootReducer.auth.user?.id ?? 0;
                    const dataResponse: VacationType = response.data.deleteVacationRequest;
                    if (userId == dataResponse.userId) {
                        return removeVacation(dataResponse.id);
                    }
                    return removeRequestVacation(dataResponse.id)
                }
                throw new Error();
            })
        )))
};

export const updateVacationEpic: Epic = (action$: Observable<ReturnType<typeof updateVacationAction>>): any => {
    return action$.pipe(
        ofType(updateVacationAction.type),
        mergeMap(action => {
            let updateVacationModel: any = action.payload;
            delete updateVacationModel.user;
            return from(graphqlRequest(updateVacationQuery, {
                model: updateVacationModel
            })).pipe(
                map(response => {
                    if (!response?.errors) {
                        const userId = store.getState().rootReducer.auth.user?.id ?? 0;
                        const dataResponse: VacationType = response.data.editVacationRequest;
                        const dataResponseFormatDate: VacationType = {
                            ...dataResponse,
                            startingTime: moment(dataResponse.startingTime).format("yyyy-MM-DD"),
                            endingTime: moment(dataResponse.endingTime).format("yyyy-MM-DD")
                        }
                        if (userId == dataResponse.userId) {
                            return updateVacation(dataResponseFormatDate);
                        }
                        if (dataResponseFormatDate.isAccepted == null) {
                            return updateRequestVacation(dataResponseFormatDate);
                        }
                        return removeRequestVacation(dataResponse.id);
                    }
                    throw new Error();
                })
            )}
        )
    )
};

export const vacationEpic = combineEpics(getVacationsByUserIdEpic, updateVacationEpic, createVacationRequestEpic, getVacationRequestEpic, removeVacationEpic);



