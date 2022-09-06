export const getPaginatedUserList = `
    query ($from: Int!, $contentPerPage: Int!, $orderBy: String, $isReverse: Boolean) {
        userFetchPageList(from: $from, contentPerPage: $contentPerPage, orderBy: $orderBy, isReverse: $isReverse) {
            id
            email
            password
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            privilegesValue 
       }
    }
`

export const getSearchResponse = `
    query ($request: String!) {
        userFetchSearchList(request: $request) {
            id
            email
            password
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            privilegesValue 
       }
    }
`

export const getUserCount = `
    query GetUserCount {
        userCount
    }
`