import {FC, useEffect, useState} from "react";
import {SickLeaveForm, SickLeaveFormActions} from "./SickLeaveForm";
import {SickLeave, SickLeaveStatusDataType, SickLeaveStatuses} from "../../types/sickLeave.types";
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../hooks/useAppSelector";
import {
    fetchAllSickLeavesForManagerByManagerId,
    updateSickLeaveRequest
} from "../../store/sickLeave/sickLeave.slice";

export type SickLeavesRequestsListStateType = {
    sickLeaveForm: {
        isVisible: boolean,
        action: SickLeaveFormActions,
        data?: SickLeave | null
    }
    statusSelectorButtons: {
        name: string,
        active: boolean
    }[]
    sickLeavesList: SickLeave[]
}

const initialState: SickLeavesRequestsListStateType = {
    sickLeaveForm: {
        isVisible: false,
        action: SickLeaveFormActions.Create,
        data: null,
    },
    statusSelectorButtons: [
        {
            name: 'All',
            active: true
        },
        {
            name: 'Under review',
            active: false
        },
        {
            name: 'Approved',
            active: false
        },
        {
            name: 'Rejected',
            active: false
        },
    ],
    sickLeavesList: []
}

export const SickLeavesRequestsList: FC = () => {

    const auth = useAuth()
    const dispatch = useDispatch()
    const sickLeaves = useAppSelector(state => state.rootReducer.sickLeave.sickLeavesRequests)
    const [state, setState] = useState(initialState)

    const getStatusDataFromSickLeave = (status: SickLeaveStatuses): SickLeaveStatusDataType => {
        switch (status) {
            case SickLeaveStatuses.Expired:
                return {className: 'expired', value: 'Expired'}
            case SickLeaveStatuses.UnderReview:
                return {className: 'under-review', value: 'Under review'}
            case SickLeaveStatuses.Approved:
                return {className: 'approved', value: 'Approved'}
            case SickLeaveStatuses.Rejected:
                return {className: 'rejected', value: 'Rejected'}
        }
    }

    const statusSelectorButtonOnClick = (buttonName: string) => {
        setState({...state, statusSelectorButtons: state.statusSelectorButtons.map(button => {
                button.active = button.name === buttonName
                return button
            })
        })
        switch (buttonName) {
            case 'All':
                setState({...state, sickLeavesList: sickLeaves})
                break;
            case 'Under review':
                setState({...state, sickLeavesList: sickLeaves.filter(sickLeave => sickLeave.status === SickLeaveStatuses.UnderReview)})
                break;
            case 'Approved':
                setState({...state, sickLeavesList: sickLeaves.filter(sickLeave => sickLeave.status === SickLeaveStatuses.Approved)})
                break;
            case 'Rejected':
                setState({...state, sickLeavesList: sickLeaves.filter(sickLeave => sickLeave.status === SickLeaveStatuses.Rejected)})
                break;
        }
    }

    useEffect(() => {
        if (auth.state?.user) {
            dispatch(fetchAllSickLeavesForManagerByManagerId({managerId: auth.state.user.id}))
        }
    }, [auth])

    useEffect(() => {
        setState({...state, sickLeavesList: sickLeaves})
    }, [sickLeaves])

    return (
        <>
            <SickLeaveForm data={state.sickLeaveForm.data}
                           action={state.sickLeaveForm.action}
                           isVisible={state.sickLeaveForm.isVisible}
                           setVisible={(visible: boolean) => setState({...state, sickLeaveForm: {...state.sickLeaveForm, isVisible: visible}})}
            />
            <div className={'sick-leaves-container flex-container flex-column w-100'}>
                <div className={'sick-leaves-panel flex-container'}>
                    <nav>
                        {
                            state.statusSelectorButtons.map((button, index) => (
                                <a key={index} className={`${button.active ? 'active' : ''}`} onClick={() => statusSelectorButtonOnClick(button.name)}>
                                    {button.name}
                                </a>
                            ))
                        }
                    </nav>
                </div>
                <div className={'sick-leaves-list flex-container flex-column'}>
                    <table className={'sick-leaves-list-table'}>
                        <thead>
                        <tr>
                            <th>Employee</th>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Status</th>
                            <th>Created at</th>
                            <th style={{width: 300}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            state.sickLeavesList.map(sickLeave => (
                                <tr key={sickLeave.id}>
                                    <td>{sickLeave.employee.firstName} {sickLeave.employee.lastName}</td>
                                    <td>{sickLeave.startDate.toLocaleDateString()}</td>
                                    <td>{sickLeave.endDate.toLocaleDateString()}</td>
                                    <td>
                                        <span className={`status ${getStatusDataFromSickLeave(sickLeave.status).className}`}>
                                            {getStatusDataFromSickLeave(sickLeave.status).value}
                                            { sickLeave.status !== SickLeaveStatuses.UnderReview &&
                                                ` by ${sickLeave.approver?.firstName ?? 'Unknown'} ${sickLeave.approver?.lastName ?? 'User'}`
                                            }
                                        </span>
                                    </td>
                                    <td>{new Date(sickLeave.creationDateTime).toLocaleString()}</td>
                                    <td>
                                        { sickLeave.status === SickLeaveStatuses.UnderReview &&
                                            <>
                                                <a className={'button green-button'} onClick={() => dispatch(updateSickLeaveRequest({sickLeave: {
                                                        id: sickLeave.id,
                                                        employeeId: sickLeave.employeeId,
                                                        startDate: sickLeave.startDate,
                                                        endDate: sickLeave.endDate,
                                                        creationDateTime: sickLeave.creationDateTime,
                                                        approverId: auth.state?.user?.id,
                                                        status: SickLeaveStatuses.Approved
                                                    }
                                                }))}>
                                                    Approve
                                                </a>
                                                <a className={'button red-button'} onClick={() => dispatch(updateSickLeaveRequest({
                                                    sickLeave: {
                                                        id: sickLeave.id,
                                                        employeeId: sickLeave.employeeId,
                                                        startDate: sickLeave.startDate,
                                                        endDate: sickLeave.endDate,
                                                        creationDateTime: sickLeave.creationDateTime,
                                                        approverId: auth.state?.user?.id,
                                                        status: SickLeaveStatuses.Rejected
                                                    }
                                                }))}>
                                                    Reject
                                                </a>
                                                <a className={'button yellow-button'} onClick={() => {
                                                    setState({...state, sickLeaveForm: {...state, action: SickLeaveFormActions.EditRequest, isVisible: true, data: sickLeave}})
                                                    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                                                }}>Edit</a>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}