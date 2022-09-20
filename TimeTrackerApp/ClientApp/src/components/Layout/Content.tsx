import {FC} from "react";
import { Route, Routes } from "react-router-dom";
import {Calendar} from "../Calendar/Calendar";
import {TimeTracker} from "../TimeTracker/TimeTracker";
import {UserList} from "../UserList/UserList";
import {ProtectedComponent} from "../Auth/ProtectedComponent";
import { Vacation } from "../Vacation/Vacation";
import { ManageVacationRequest  } from "../Vacation/ManageVacations";
import {UserPage} from "../UserPage/UserPage";

import {SickLeavesList} from "../SickLeaves/SickLeavesList";
import {SickLeavesRequestsList} from "../SickLeaves/SickLeavesRequestsList";
import {CreateUserForm} from "../UserList/CreateUserForm";

export type ContentStateType = {
    showContent: boolean
}

export const Content: FC = () => {

    return (
        <div className={"content-container flex-container w-100"}>
            <Routes>
                <Route path={"/home"} element={<ProtectedComponent component={<TimeTracker />} />} />
                <Route path={"/calendar"} element={<ProtectedComponent component={<Calendar />} />} />
                <Route path={"/user-list"} element={<ProtectedComponent component={<UserList />} />} />
                <Route path={'/user/:id'} element={<UserPage />} />
                <Route path={"/user-create"} element={<ProtectedComponent component={<CreateUserForm />} />} />
                <Route path={"/user-page"} element={<ProtectedComponent component={<UserPage />} />} />
                <Route path={"/vacation"} element={<ProtectedComponent component={<Vacation />} />} />
                <Route path={"/manage-vacation"} element={<ProtectedComponent component={<ManageVacationRequest />} />} />
                <Route path={"/sick-leaves"} element={<ProtectedComponent component={<SickLeavesList />} />}/>
                <Route path={"/manage-sick-leaves"} element={<ProtectedComponent component={<SickLeavesRequestsList />} />}/>
            </Routes>
        </div>
    )
}