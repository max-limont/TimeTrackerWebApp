export const getUserByEmailQuery = `
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            email
            password
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue 
        }
    }
`

export const getUserByIdQuery = `
    query GetUserById($id: ID!) {
        getUserById(id: $id) {
            id
            email
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
            vacationPermissionId
        }
    }
`

export const createUserQuery = `
    mutation ($userInput: UserInputType!) {
      createUser(user: $userInput) {
        id
        email
        password
        firstName
        lastName
      }
    }
`

export const isUserExistQuery = `
    query ($email: String!) {
      IsUserEmailExist(email: $email)
    }
`