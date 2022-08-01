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

export const getUserById=`
query ($id: ID){
    user_GetById(id: $id){
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