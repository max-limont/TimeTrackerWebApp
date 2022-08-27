import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {
    addSickLeave,
    createSickLeave, deleteSickLeave, editSickLeave,
    fetchAllSickLeaves,
    fetchAllSickLeavesByEmployeeId, fetchAllSickLeavesForManagerByManagerId, getSickLeaveById,
    parseObjectToSickLeave, removeSickLeave,
    setSickLeaves, updateSickLeave
} from "./sickLeave.slice";
import {graphqlRequest} from "../../graphql/api";
import {
    createSickLeaveMutation,
    fetchAllSickLeavesByEmployeeIdQuery,
    fetchAllSickLeavesForManagerByManagerIdQuery,
    fetchAllSickLeavesQuery, getSickLeaveByIdQuery, removeSickLeaveMutation, updateSickLeaveMutation
} from "../../graphql/queries/sickLeave.queries";
import {Action} from "react-epics";

export const fetchAllSickLeavesEpic: Epic = (action$: Observable<ReturnType<typeof fetchAllSickLeaves>>): any => {
    return action$.pipe(
        ofType(fetchAllSickLeaves.type),
        mergeMap(action => from(graphqlRequest(fetchAllSickLeavesQuery)).pipe(
            map(response => {
                if (response?.data?.fetchAllSickLeaves) {
                    const apiResponse = response.data.fetchAllSickLeaves;
                    const sickLeaves = apiResponse.map((sickLeave: any) => parseObjectToSickLeave(sickLeave))
                    return setSickLeaves(sickLeaves)
                }
                return {type: "FetchAllSickLeavesError", payload: "Error"} as Action
            })
        ))
    )
}

export const fetchAllSickLeavesByEmployeeIdEpic: Epic = (action$: Observable<ReturnType<typeof fetchAllSickLeavesByEmployeeId>>): any => {
    return action$.pipe(
        ofType(fetchAllSickLeavesByEmployeeId.type),
        mergeMap(action => from(graphqlRequest(fetchAllSickLeavesByEmployeeIdQuery, action.payload)).pipe(
            map(response => {
                if (response?.data?.fetchAllSickLeavesByEmployeeId) {
                    const apiResponse = response.data.fetchAllSickLeavesByEmployeeId
                    const sickLeaves = apiResponse.map((sickLeave: any) => parseObjectToSickLeave(sickLeave))
                    return setSickLeaves(sickLeaves)
                }
                return {type: "FetchAllSickLeavesByEmployeeIdError", payload: "Error"} as Action
            })
        ))
    )
}

export const fetchAllSickLeavesForManagerByManagerIdEpic: Epic = (action$: Observable<ReturnType<typeof fetchAllSickLeavesForManagerByManagerId>>): any => {
    return action$.pipe(
        ofType(fetchAllSickLeavesForManagerByManagerId.type),
        mergeMap(action => from(graphqlRequest(fetchAllSickLeavesForManagerByManagerIdQuery, action.payload)).pipe(
            map(response => {
                if (response?.data?.fetchAllSickLeavesForManagerByManagerId) {
                    const apiResponse = response.data.fetchAllSickLeavesForManagerByManagerId
                    const sickLeaves = apiResponse.map((sickLeave: any) => parseObjectToSickLeave(sickLeave))
                    return setSickLeaves(sickLeaves)
                }
                return {type: "FetchAllSickLeavesForManagerByManagerIdError", payload: "Error"} as Action
            })
        ))
    )
}

export const getSickLeaveByIdEpic: Epic = (action$: Observable<ReturnType<typeof getSickLeaveById>>): any => {
    return action$.pipe(
        ofType(getSickLeaveById.type),
        mergeMap(action => from(graphqlRequest(getSickLeaveByIdQuery, action.payload)).pipe(
            map(response => {
                if (response?.data?.getSickLeaveById) {
                    const sickLeave = parseObjectToSickLeave(response?.data?.getSickLeaveById)
                    return setSickLeaves([sickLeave])
                }
            })
        ))
    )
}

export const createSickLeaveEpic: Epic = (action$: Observable<ReturnType<typeof createSickLeave>>): any => {
    return action$.pipe(
        ofType(createSickLeave.type),
        mergeMap(action => from(graphqlRequest(createSickLeaveMutation, action.payload)).pipe(
            map(response => {
                if (response?.data?.createSickLeave) {
                    const sickLeave = parseObjectToSickLeave(response.data.createSickLeave)
                    return addSickLeave(sickLeave)
                }
                return {type: "CreateSickLeaveError", payload: "Error"} as Action
            })
        ))
    )
}

export const updateSickLeaveEpic: Epic = (action$: Observable<ReturnType<typeof updateSickLeave>>): any => {
    return action$.pipe(
        ofType(updateSickLeave.type),
        mergeMap(action => from(graphqlRequest(updateSickLeaveMutation, action.payload)).pipe(
            map(response => {
                if (response?.data?.editSickLeave) {
                    const sickLeave = parseObjectToSickLeave(response.data.editSickLeave)
                    return editSickLeave({...sickLeave, creationDateTime: new Date(sickLeave.creationDateTime.getTime() + sickLeave.creationDateTime.getTimezoneOffset() * 60 * 1000)})
                }
                return {type: "UpdateSickLeaveError", payload: "Error"} as Action
            })
        ))
    )
}

export const removeSickLeaveEpic: Epic = (action$: Observable<ReturnType<typeof removeSickLeave>>): any => {
    return action$.pipe(
        ofType(removeSickLeave.type),
        mergeMap(action => from(graphqlRequest(removeSickLeaveMutation, action.payload)).pipe(
            map(response => {
                if (response?.data?.removeSickLeave) {
                    const sickLeave = parseObjectToSickLeave(response.data.removeSickLeave)
                    return deleteSickLeave(sickLeave.id)
                }
                return {type: "RemoveSickLeaveError", payload: "Error"} as Action
            })
        ))
    )
}

export const sickLeaveEpics = combineEpics(fetchAllSickLeavesEpic, fetchAllSickLeavesByEmployeeIdEpic, fetchAllSickLeavesForManagerByManagerIdEpic, getSickLeaveByIdEpic, createSickLeaveEpic, updateSickLeaveEpic, removeSickLeaveEpic)