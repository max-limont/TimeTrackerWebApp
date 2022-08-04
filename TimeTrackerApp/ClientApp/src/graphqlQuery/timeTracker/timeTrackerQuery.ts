export const fetchUserRecords = `
    query FetchAllUserRecords($userId: ID!) {
        record_fetchAllByUser(userId: $userId) {
            id
            creatorId,
            
        }
    }
`