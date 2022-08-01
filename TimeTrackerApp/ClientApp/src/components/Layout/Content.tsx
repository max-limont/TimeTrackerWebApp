import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { refreshTokenKey } from "../../Cookie/Cookie";
import { parseJwt } from "../../store/parserJWT/parserJWT";
import { AuthUserResponse } from "../../type/User/AuthUser";
import Calendar from "../Calendar/Calendar";

export const Content: FC = () => {

    return (
        <div className={"content-container flex-container w-100"}>
            <Routes>
            </Routes>
        </div>
    );
}