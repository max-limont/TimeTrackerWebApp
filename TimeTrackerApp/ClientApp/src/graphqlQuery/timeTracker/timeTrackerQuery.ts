export const fetchAllUserRecordsQuery = `
    query FetchAllUserRecords($userId: ID!) {
        fetchAllUserRecords(userId: $userId) {
            id
            workingTime
            comment
            creatorId
            editorId
            createdAt
        }
    }
`