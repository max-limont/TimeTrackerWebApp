export const getUserByEmailQuery = `
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            email
            firstName
            lastName
            password
            activation
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
            activation
            password
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
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
            activation
            lastName
            password
            isFullTimeEmployee
            weeklyWorkingTime
            privilegesValue 
      }
    }
`

export const deleteUserQuery = `
    mutation($id: ID!,$state: Boolean){
        changeActivationState(id: $id, activationState: $state){
            id
            email
            password
            firstName
            activation
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            privilegesValue 
        }
    }
`
export const editUserQuery = `
    mutation ($userInput: UserInputType!) {
      editUser(user: $userInput) {
            id
            email
            password
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            privilegesValue 
            activation
      }
    }
`