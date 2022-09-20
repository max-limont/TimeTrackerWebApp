export const getUserByEmailQuery = `
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            email
            firstName
            lastName
            password
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
            activation
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
            password
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
            activation
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
            password
            isFullTimeEmployee
            weeklyWorkingTime
            privilegesValue 
            activation
      }
    }
`

export const deleteUserQuery = `
    mutation($id: ID!){
        deleteUser(id: $id){
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