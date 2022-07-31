import { parse } from "node:path/posix";
import { FC } from "react";
import { Cookies } from "react-cookie";
import { Route, Routes } from "react-router-dom";
import { refreshTokenKey } from "../../store/Cookie/Cookie";
import { parseJwt } from "../../store/parserJWT/parserJWT";
import { AuthUserResponse } from "../../type/User/AuthUser";
import Calendar from "../Calendar/Calendar";
import { Home } from "./Home";

export const Content: FC = () => {
    
    return (
        <div className={"content-container flex-container w-100"}>
            <Routes>
                <Route index element={<Home />} />
                <Route path={"/calendar"} element={<Calendar />} />
            </Routes>
        </div>
    );
}