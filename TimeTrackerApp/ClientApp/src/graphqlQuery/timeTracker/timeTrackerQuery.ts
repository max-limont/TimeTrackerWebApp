import {Record} from "../../type/TimeTracker/timeTracker.types";

export const fetchAllUserRecordsQuery = `
    query FetchAllUserRecords($userId: ID!) {
        fetchAllUserRecords(userId: $userId) {
            id
            workingTime
            comment
            employeeId
            editorId
            isAutomaticallyCreated
            createdAt
        }
    }
`

export const createRecordMutation = `
    mutation CreateRecord($record: RecordInputType!) {
        createRecord(record: $record) {
            id
            workingTime
            comment
            employeeId
            editorId
            isAutomaticallyCreated
            createdAt
        }
    }
`

export const updateRecordMutation = `
    mutation EditRecord($record: RecordInputType!) {
        editRecord(record: $record) {
            id
            workingTime
            comment
            employeeId
            editorId
            isAutomaticallyCreated
            createdAt
        }
    }
`

export const deleteRecordMutation = `
    mutation DeleteRecord($id: ID!) {
        deleteRecord(id: $id) {
            id
            workingTime
            comment
            employeeId
            editorId
            isAutomaticallyCreated
            createdAt
        }
    }
`

export type FetchAllUserRecordsInputType = {
    userId: number
}

export type CreateRecordInputType = {
    record: Record
}

export type UpdateRecordInputType = {
    record: Record
}

export type DeleteRecordInputType = {
    id: number
}