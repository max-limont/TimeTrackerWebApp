import {combineEpics, Epic, ofType} from "redux-observable";
import {
    addRecord, editRecord,
    createRecord, deleteRecord,
    fetchAllUserRecords, removeRecord,
    setRecords, updateRecord, fetchUserRecordsByMonth,
} from "./timeTracker.slice";
import {from, map, mergeMap, Observable} from "rxjs";
import {graphqlRequest} from "../../graphql/api";
import {
    createRecordMutation, deleteRecordMutation,
    fetchAllUserRecordsQuery, fetchUserRecordsByMonthQuery, updateRecordMutation
} from "../../graphql/queries/timeTracker.queries";
import {
    CreateRecordInputType, DeleteRecordInputType,
    FetchAllUserRecordsInputType,
    Record,
    UpdateRecordInputType
} from "../../types/timeTracker.types";
import {Action} from "react-epics";

const fetchAllUserRecordsEpic: Epic = (action$: Observable<ReturnType<typeof fetchAllUserRecords>>): any => {
    return action$.pipe(
        ofType(fetchAllUserRecords.type),
        mergeMap(action => from(graphqlRequest(fetchAllUserRecordsQuery, {
            userId: action.payload
        } as FetchAllUserRecordsInputType)).pipe(
            map(response => {
                if (response?.data?.fetchAllUserRecords) {
                    const records = response.data.fetchAllUserRecords.map((record: any) => {
                        return {
                            id: parseInt(record.id),
                            workingTime: parseInt(record.workingTime),
                            employeeId: parseInt(record.employeeId),
                            isAutomaticallyCreated: Boolean(JSON.parse(record.isAutomaticallyCreated)),
                            editorId: parseInt(record.editorId),
                            createdAt: new Date(new Date(record.createdAt) + " UTC")
                        } as Record;
                    }) as Record[]
                    return setRecords(records)
                }
                return { payload: "Error", type: "FetchAllUserRecordsError" } as Action
            })
        ))
    )
}

const fetchUserRecordsByMonthEpic: Epic = (action$: Observable<ReturnType<typeof fetchUserRecordsByMonth>>): any => {
    return action$.pipe(
        ofType(fetchUserRecordsByMonth.type),
        mergeMap(action => from(graphqlRequest(fetchUserRecordsByMonthQuery, action.payload)).pipe(
            map(response => {
                if (response?.data?.fetchUserRecordsByMonth) {
                    const records = response.data.fetchUserRecordsByMonth.map((record: any) => {
                        return {
                            id: parseInt(record.id),
                            workingTime: parseInt(record.workingTime),
                            employeeId: parseInt(record.employeeId),
                            isAutomaticallyCreated: Boolean(JSON.parse(record.isAutomaticallyCreated)),
                            editorId: parseInt(record.editorId),
                            createdAt: new Date(new Date(record.createdAt) + " UTC")
                        } as Record;
                    }) as Record[]
                    return setRecords(records)
                }
                return { payload: "Error", type: "FetchUserRecordsByMonthError" } as Action
            })
        ))
    )
}

const addRecordEpic: Epic = (action$: Observable<ReturnType<typeof createRecord>>): any => {
    return action$.pipe(
        ofType(createRecord.type),
        mergeMap(action => from(graphqlRequest(createRecordMutation, {
            record: action.payload
        } as CreateRecordInputType)).pipe(
            map(response => {
                if (response?.data?.createRecord) {
                    const record = response.data.createRecord;
                    return addRecord({
                        id: parseInt(record.id),
                        workingTime: parseInt(record.workingTime),
                        employeeId: parseInt(record.employeeId),
                        isAutomaticallyCreated: Boolean(JSON.parse(record.isAutomaticallyCreated)),
                        editorId: parseInt(record.editorId),
                        createdAt: new Date(new Date(record.createdAt) + " UTC")
                    } as Record)
                }
                return { payload: "Error", type: "CreateRecordError" } as Action
            })
        ))
    )
}


const updateRecordEpic: Epic = (action$: Observable<ReturnType<typeof updateRecord>>): any => {
    return action$.pipe(
        ofType(updateRecord.type),
        mergeMap(action => from(graphqlRequest(updateRecordMutation, {
            record: action.payload
        } as UpdateRecordInputType)).pipe(
            map(response => {
                if (response?.data?.editRecord) {
                    return editRecord(action.payload)
                }
                return { payload: "Error", type: "UpdateRecordError" }
            })
        ))
    )
}

const deleteRecordEpic: Epic = (action$: Observable<ReturnType<typeof deleteRecord>>): any => {
    return action$.pipe(
        ofType(deleteRecord.type),
        mergeMap(action => from(graphqlRequest(deleteRecordMutation, {
            id: action.payload
        } as DeleteRecordInputType)).pipe(
            map(response => {
                if (response?.data?.deleteRecord) {
                    return removeRecord(action.payload)
                }
                return { payload: "Error", type: "DeleteRecordError" } as Action
            })
        ))
    )
}

export const timeTrackerEpics = combineEpics(fetchAllUserRecordsEpic, addRecordEpic, deleteRecordEpic, updateRecordEpic, fetchUserRecordsByMonthEpic)