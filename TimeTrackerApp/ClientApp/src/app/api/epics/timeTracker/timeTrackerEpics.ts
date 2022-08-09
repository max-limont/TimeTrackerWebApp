import {combineEpics, Epic, ofType} from "redux-observable";
import {
    addRecord, editRecord,
    createRecord, deleteRecord,
    fetchAllUserRecords, removeRecord,
    setRecords, updateRecord,
} from "../../../../store/slice/timeTracker/timeTrackerSlice";
import {store} from "../../../store";
import {from, map, mergeMap, Observable} from "rxjs";
import {graphqlRequest} from "../../api";
import {
    CreateRecordInputType,
    createRecordMutation, DeleteRecordInputType, deleteRecordMutation,
    FetchAllUserRecordsInputType,
    fetchAllUserRecordsQuery, UpdateRecordInputType, updateRecordMutation
} from "../../../../graphqlQuery/timeTracker/timeTrackerQuery";
import {Record} from "../../../../type/TimeTracker/timeTracker.types";
import {Action} from "react-epics";

const setRecordsEpic: Epic = (action$: Observable<ReturnType<typeof fetchAllUserRecords>>): any => {
    return action$.pipe(
        ofType("FetchAllUserRecords"),
        mergeMap(action => from(graphqlRequest(fetchAllUserRecordsQuery, {
            userId: action.payload
        } as FetchAllUserRecordsInputType)).pipe(
            map(response => {
                if (response.data && response.data.fetchAllUserRecords) {
                    const records = response.data.fetchAllUserRecords.map((record: any) => {
                        return {
                            id: parseInt(record.id),
                            workingTime: parseInt(record.workingTime),
                            comment: record.comment,
                            employeeId: parseInt(record.employeeId),
                            isAutomaticallyCreated: Boolean(JSON.parse(record.isAutomaticallyCreated)),
                            editorId: parseInt(record.editorId),
                            createdAt: new Date(record.createdAt)
                        } as Record;
                    }) as Record[]
                    store.dispatch(setRecords(records))
                    return { payload: "Success", type: "FetchAllUserRecordsSuccess" } as Action
                }
                return { payload: "Error", type: "FetchAllUserRecordsError" } as Action
            })
        ))
    )
}

const addRecordEpic: Epic = (action$: Observable<ReturnType<typeof createRecord>>): any => {
    return action$.pipe(
        ofType("CreateRecord"),
        mergeMap(action => from(graphqlRequest(createRecordMutation, {
            record: action.payload
        } as CreateRecordInputType)).pipe(
            map(response => {
                if (response.data && response.data.createRecord) {
                    const record = response.data.createRecord;
                    store.dispatch(addRecord({
                        id: parseInt(record.id),
                        workingTime: parseInt(record.workingTime),
                        comment: record.comment,
                        employeeId: parseInt(record.employeeId),
                        isAutomaticallyCreated: Boolean(JSON.parse(record.isAutomaticallyCreated)),
                        editorId: parseInt(record.editorId),
                        createdAt: new Date(record.createdAt)
                    } as Record))
                    return { payload: "Success", type: "CreateRecordSuccess" } as Action
                }
                return { payload: "Error", type: "CreateRecordError" } as Action
            })
        ))
    )
}


const updateRecordEpic: Epic = (action$: Observable<ReturnType<typeof updateRecord>>): any => {
    return action$.pipe(
        ofType("UpdateRecord"),
        mergeMap(action => from(graphqlRequest(updateRecordMutation, {
            record: action.payload
        } as UpdateRecordInputType)).pipe(
            map(response => {
                if (response.data && response.data.editRecord) {
                    store.dispatch(editRecord(action.payload))
                    return { payload: "Success", type: "UpdateRecordSuccess" }
                }
                return { payload: "Error", type: "UpdateRecordError" }
            })
        ))
    )
}

const deleteRecordEpic: Epic = (action$: Observable<ReturnType<typeof deleteRecord>>): any => {
    return action$.pipe(
        ofType("DeleteRecord"),
        mergeMap(action => from(graphqlRequest(deleteRecordMutation, {
            id: action.payload
        } as DeleteRecordInputType)).pipe(
            map(response => {
                if (response.data && response.data.deleteRecord) {
                    store.dispatch(removeRecord(action.payload))
                    return { payload: "Success", type: "DeleteRecordSuccess" } as Action
                }
                return { payload: "Error", type: "DeleteRecordError" } as Action
            })
        ))
    )
}

export const timeTrackerEpics = combineEpics(setRecordsEpic, addRecordEpic, deleteRecordEpic, updateRecordEpic)