const queryFragment = `
    id,
    comment,
    endingTime,
    startingTime,
    userId,
    isAccepted 
`;

export const getAllVacationsQuery = `
    query {
        fetchAllVacationRequests {
            ${queryFragment}
        }
    }
`

export const getVacationsByUserIdQuery = `
    query ($userId: ID!) {
        fetchAllUserVacationRequests(userId: $userId) {
            ${queryFragment},
            approvers{
                firstName,
                id,
                lastName
              },
              vacationResponse{
                comment,
                user{
                  id,
                  firstName,
                  lastName
                }
            }
        }
    }
`

export const getVacationByIdQuery = ` 
    query ($userId: ID!) {
        getVacationRequestById(userId: $userId) {
            ${queryFragment}
        }
    }
`;

export const createVacationQuery = `
    mutation ($model: VacationInputType!) {
        createVacationRequest(vacationRequest: $model) {
            ${queryFragment},
            approvers{
                firstName,
                id,
                lastName
              },
              vacationResponse{
                comment,
                user{
                  id,
                  firstName,
                  lastName
                }
            }
        }
    }
`;

export const removeVacationQuery = ` 
    mutation ($id: Int!) {
        deleteVacationRequest(id: $id) {
            ${queryFragment}
        }
    }
`

export const updateVacationQuery = `
    mutation ($model: VacationInputType!) {
        editVacationRequest(vacationRequest: $model) {
            ${queryFragment},
            user{
                id
                email
                firstName
                lastName
            },
            approvers{
                firstName,
                id,
                lastName
              },
              vacationResponse{
                comment,
                user{
                  id,
                  firstName,
                  lastName
                }
            }
        }
    }
`

export const getVacationRequestQuery = `
    query($id: Int!) {
        getRequestVaction(receiverId: $id) {
            ${queryFragment},
            user {
                id
                email
                firstName
                lastName
            }
        }
    }
`

export const getApproversByUserId = ` 
query($userId: Int!){
getApprovers(userId: $userId){
id, 
            email ,
            firstName,
            lastName,
}
}`

export const createResponseQuery = `
mutation($state:Boolean,$response:VacationResponseInputType ){
    changeAcceptedState(response: $response, stateAccepted: $state){
        ${queryFragment},
        user{
            id
            email
            firstName
            lastName
        }
        approvers{
            firstName,
            id,
            lastName
          },
          vacationResponse{
            comment,
            user{
              id,
              firstName,
              lastName
            }
        }
    }
}`