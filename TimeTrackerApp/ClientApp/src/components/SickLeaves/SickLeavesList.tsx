import {FC} from "react";

export const SickLeavesList: FC = () => {

    return (
        <div className={'sick-leaves-container flex-container flex-column w-100'}>
            <div className={'sick-leaves-list flex-container flex-column'}>
                <table className={'sick-leaves-list-table'}>
                    <thead>
                        <tr>
                            <th>Start date</th>
                            <th>End date</th>
                            <th>Status</th>
                            <th>Created at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>25.08.2022</td>
                            <td>28.08.2022</td>
                            <td>
                                <span className={'status under-review'}>Under review</span>
                            </td>
                            <td>24.08.2022 14:01</td>
                            <td>
                                <a className={'button yellow-button'}>Edit</a>
                                <a className={'button red-button'}>Remove</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}