export const getPaginatedUserList = `
    query ($from: Int!, $contentPerPage: Int!, $orderBy: String, $isReverse: Boolean) {
        userFetchPageList(from: $from, contentPerPage: $contentPerPage, orderBy: $orderBy, isReverse: $isReverse) {
            id,
            email,
            firstName,
            lastName,
            weeklyWorkingTime,
            remainingVacationDays,
       }
    }
`

export const getSearchResponse = `
    query ($request: String) {
        userFetchSearchList(request: $request) {
            id,
            email,
            firstName,
            lastName,
            weeklyWorkingTime,
            remainingVacationDays,
       }
    }
`

export const getUserCount = `
    query GetUserCount {
        userCount
    }
`