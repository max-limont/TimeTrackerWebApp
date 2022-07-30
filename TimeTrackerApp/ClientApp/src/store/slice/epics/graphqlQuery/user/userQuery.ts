export const getUserByEmailQuery = `
query($email: String!){
    user_getByEmail(email: $email){
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
`;