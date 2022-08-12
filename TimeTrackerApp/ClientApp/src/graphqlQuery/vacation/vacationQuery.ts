const queryFragment = `
id ,
comment ,
endingTime ,
startingTime ,
userId ,
isAccepted 
`;

export const getAllVacationsQuery=`
query{
    fetchAllVacationRequests{
        ${queryFragment}
    }
}
`; 

export const getVacationsByUserIdQuery = `
    query ($userId: ID!) {
        fetchAllUserVacationRequests(userId: $userId) {
           ${queryFragment}
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

export const createVacationQuery=`
mutation ($model: VacationInputType!){
    createVacationRequest(vacationRequest: $model){
        ${queryFragment}
    }
  }
`;

export const removeVacationQuery = ` 
mutation ($id: ID!){
    deleteVacationRequest(id: $id){
        ${queryFragment}
    }
  }
`;

export const updateVacationQuery = `
mutation ($model: VacationInputType!){
    editVacationRequest(vacationRequest: $model){
        ${queryFragment}
    }
  }
`;

