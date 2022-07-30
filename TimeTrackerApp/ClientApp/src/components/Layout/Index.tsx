import {Header} from "./Header";
import {Menu} from "./Menu";
import {FC, useEffect} from "react";
import {Content} from "./Content";
import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

export const Index: FC = () => {
    const token =useAppSelector(s=>s.rootReducer.auth.token);
    const navigate= useNavigate();
  
    useEffect(()=>{
        if(token?.accessToken==null, token?.refreshToken==null){
            navigate("/welcome")
        }
    });
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