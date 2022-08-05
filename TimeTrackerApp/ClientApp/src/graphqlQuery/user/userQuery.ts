export const getUserByEmailQuery = `
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            email
            password
            firstName
            lastName
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue 
        }
    }
`

export const getUserByIdQuery = `
    query GetUserById($id: ID) {
        getUserById(id: $id) {
            id
            email
            password
            firstName
            lastName
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue 
       }
    }
`