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
        }
    }
`

export type GetUserByIdQueryInputType = {
    id: number
}

export type GetUserByEmailQueryInputType = {
    email: string
}