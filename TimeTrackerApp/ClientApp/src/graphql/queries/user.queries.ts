export const getUserByEmailQuery = `
    query GetUserByEmail($email: String!) {
        getUserByEmail(email: $email) {
            id
            email
            firstName
            lastName
            isFullTimeEmployee
            weeklyWorkingTime
            remainingVacationDays
            privilegesValue
            vacationPermissionId,
            teamId,
            roleId
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
            vacationPermissionId,
            teamId,
            roleId
        }
    }
`