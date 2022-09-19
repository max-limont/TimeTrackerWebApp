export const getPaginatedUserList = `
    query ($from: Int!, $contentPerPage: Int!, $orderBy: String, $isReverse: Boolean) {
        userFetchPageList(from: $from, contentPerPage: $contentPerPage, orderBy: $orderBy, isReverse: $isReverse) {
            id
            email
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
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
       }
    }
`

export const getUserCount = `
    query GetUserCount {
        userCount
    }
`

export const getExportData= `
    query ExportData($orderBy: String!, $isReverse: Boolean!){
      exportUsers(orderBy: $orderBy, isReverse: $isReverse){
        email,
        firstName,
        lastName,
        workType,
        workingTime
      }
    }
`