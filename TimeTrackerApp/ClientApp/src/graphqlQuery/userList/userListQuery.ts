export const getPaginatedUserList=`
query ($from: Int!, $to: Int!, $orderBy: String){
    userFetchPageList(from: $from, to: $to, orderBy: $orderBy){
        id ,
        email ,
        password ,
        firstName ,
        lastName,
        weeklyWorkingTime ,
        remainingVacationDays ,
        privilegesValue 
   }
 }`

export const getSearchResponse=`
query ($request: String!){
    userFetchSearchList(request: $request){
        id ,
        email ,
        password ,
        firstName ,
        lastName,
        weeklyWorkingTime ,
        remainingVacationDays ,
        privilegesValue 
   }
 }
`

export const getUserCount=`
query GetUserCount{
  userCount
}
`