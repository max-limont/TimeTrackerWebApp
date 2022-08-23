export const fetchAllUserRecordsQuery = `
    query FetchAllUserRecords($userId: ID!) {
        fetchAllUserRecords(userId: $userId) {
            id
            workingTime
            employeeId
            editorId
            isAutomaticallyCreated
            createdAt
        }
    }
`

export const fetchUserRecordsByMonthQuery = `
    query FetchUserRecordsByMonth($userId: ID!, $monthNumber: Int!) {
        fetchUserRecordsByMonth(userId: $userId, monthNumber: $monthNumber) {
            id
            workingTime
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
            employeeId
            editorId
            isAutomaticallyCreated
            createdAt
        }
    }
`