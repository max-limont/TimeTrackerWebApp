export const fetchAllSickLeavesQuery = `
    query FetchAllSickLeaves {
        fetchAllSickLeaves {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`

export const fetchAllSickLeavesByEmployeeIdQuery = `
    query FetchAllSickLeavesByEmployeeId($employeeId: ID!) {
        fetchAllSickLeavesByEmployeeId(employeeId: $employeeId) {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`

export const fetchAllSickLeavesForManagerByManagerIdQuery = `
    query FetchAllSickLeavesForManagerByManagerId($managerId: ID!) {
        fetchAllSickLeavesForManagerByManagerId(managerId: $managerId) {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`

export const getSickLeaveByIdQuery = `
    query GetSickLeaveById($id: ID!) {
        getSickLeaveById(id: $id) {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`

export const createSickLeaveMutation = `
    mutation CreateSickLeave($sickLeave: SickLeaveInputType!) {
        createSickLeave(sickLeave: $sickLeave) {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`

export const updateSickLeaveMutation = `
    mutation EditSickLeave($sickLeave: SickLeaveInputType!) {
        editSickLeave(sickLeave: $sickLeave) {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`

export const removeSickLeaveMutation = `
    mutation RemoveSickLeave($id: ID!) {
        removeSickLeave(id: $id) {
            id
            startDate
            endDate
            employeeId
            approverId
            status
            creationDateTime
            employee {
                id
                email
                firstName
                lastName
                isFullTimeEmployee
                weeklyWorkingTime
                remainingVacationDays
                privilegesValue
            }
            approver {
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
    }
`