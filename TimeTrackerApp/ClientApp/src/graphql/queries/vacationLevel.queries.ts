const queryFragment = `
    id,
    nameLevel,
    value
`;

export const getAllVacationsLevel = `
    query {
        vacationLevelQueries {
            getAllVacationsLevel {
                ${queryFragment}
            }
        }
    }
`;

export const getVacationLevelById = `
    query ($id: Int!) {
        vacationLevelQueries {
            getVacationLevelById(id: $id) {
                ${queryFragment}
            }
        }
    }
`

export const createVacationLevel = `
    mutation ($model: VacationLevelInputType) {
        vacationLevelMutation {
            createVacationLevel(vacationLevel: $model) {
                ${queryFragment}
            }
        }
    }
`

export const updateVacationLevel = `
    mutation ($model: VacationLevelInputType) {
        vacationLevelMutation {
            updateVacationLevel(vacationLevel: $model) {
                ${queryFragment}
            }
        }
    }
`

export const deleteVacationLevel = `
    mutation ($id: Int) {
        vacationLevelMutation {
            updateVacationLevel(id: $id) {
                ${queryFragment}
            }
        }
    }
`