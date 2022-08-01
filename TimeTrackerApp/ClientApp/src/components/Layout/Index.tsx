import {Header} from "./Header";
import {Menu} from "./Menu";
import {FC, useEffect} from "react";
import {Content} from "./Content";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { clearCookie, getCookie, refreshTokenKey } from "../../Cookie/Cookie";

export const Index: FC = () => {
    const navigate =useNavigate();
    const refreshToken = getCookie(refreshTokenKey);

    useEffect(()=>{
      
        if(refreshToken==null){
            navigate("/welcome");
        }
    },[refreshToken]);


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