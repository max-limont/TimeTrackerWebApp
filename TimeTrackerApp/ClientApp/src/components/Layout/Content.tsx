import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import {Home} from "../TimeTracker/Home";
import UserList from "../UserList/UserList";
import {ProtectedComponent} from "../Auth/ProtectedComponent";
import { Vacation } from "../Vacation/Vacation";

export const Content: FC = () => {

    return (
        <div className={"content-container flex-container w-100"}>
            <Routes>
                <Route index element={<ProtectedComponent component={<Home />} />} />
                <Route path={"/calendar"} element={<ProtectedComponent component={<Calendar />} />} />
                <Route path={"/userList"} element={<ProtectedComponent component={<UserList />} />} />
                <Route path={"/vacation"} element={<ProtectedComponent component={<Vacation />} />} />
            </Routes>
        </div>
    );
}