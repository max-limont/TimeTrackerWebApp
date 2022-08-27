export const getPaginatedUserList = `
    query ($from: Int!, $contentPerPage: Int!, $orderBy: String, $isReverse: Boolean) {
        userFetchPageList(from: $from, contentPerPage: $contentPerPage, orderBy: $orderBy, isReverse: $isReverse) {
            id
            email
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
            vacationPermissionId,
            teamId,
            roleId
       }
    }
`

export const getSearchResponse = `
    query ($request: String) {
        userFetchSearchList(request: $request) {
            id
            email
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
            vacationPermissionId,
            teamId,
            roleId
       }
    }
`

export const getUserCount = `
    query GetUserCount {
        userCount
    }
`