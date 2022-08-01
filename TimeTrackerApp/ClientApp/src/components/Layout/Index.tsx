import {Header} from "./Header";
import {Menu} from "./Menu";
<<<<<<< HEAD
import {FC, useEffect} from "react";
import {Content} from "./Content";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { clearCookie, getCookie, refreshTokenKey } from "../../store/Cookie/Cookie";

export const Index: FC = () => {
    const navigate =useNavigate();
    const refreshToken = getCookie(refreshTokenKey);
    const accessToken = useAppSelector(s=>s.rootReducer.auth.token?.accessToken);

    useEffect(()=>{
        if(refreshToken==null){
            navigate("/welcome");
        }
    },[refreshToken]);
=======
import {FC} from "react";
import {Content} from "./Content";

export const Index: FC = () => {
>>>>>>> 9bad6087b545b86277939ce4b9fc9940c9698454

    return (
        <main className={"main-container flex-container w-100"}>
            <div className={"container flex-container w-100"}>
                <Menu />
                <div className={"main-container flex-container w-100 flex-column"}>
                    <Header />
                    <Content />
                </div>
            </div>
        </main>
    );
}