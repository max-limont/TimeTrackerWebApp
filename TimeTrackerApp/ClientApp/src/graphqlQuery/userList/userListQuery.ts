export const getPaginatedUserList=`
query ($from: Int!, $to: Int!, $orderBy: String){
    userFetchPageList(from: $from, to: $to, orderBy: $orderBy){
        id,
        email,
        firstName,
        lastName,
        weeklyWorkingTime,
        remainingVacationDays,
   }
 }`

export const getSearchResponse=`
query ($request: String!){
    userFetchSearchList(request: $request){
        id,
        email,
        firstName,
        lastName,
        weeklyWorkingTime,
        remainingVacationDays,
   }
 }
`

export const getUserCount=`
query GetUserCount{
  userCount
}
`