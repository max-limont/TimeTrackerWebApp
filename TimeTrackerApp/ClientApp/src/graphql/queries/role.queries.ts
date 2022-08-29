const roleQueryFragment = `  
id,
title,
value`

export const getRolesQuery = `
query {
    roleQuery {
        getRoles {
            ${roleQueryFragment}
        }
    }
}
`;

export const getRoleByIdQuery = `
query($id: Int){
    roleQuery {
    getRoleById(id: $id) {
        ${roleQueryFragment}
      }
    }
}
`;
export const getRoleByUserIdQuery = `
query($id: Int){
    roleQuery {
        getRoleByUserId(userId: $id) {
            ${roleQueryFragment}
        }
}`;