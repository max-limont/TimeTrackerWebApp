import {Header} from "./Header";
import {Menu} from "./Menu";
import {FC, useEffect, useState} from "react";
import {Content} from "./Content";
import connection from "../../store/signalr";
import {useAuth} from "../../hooks/useAuth";


window.addEventListener("close", ()=>{
    connection.invoke("Test");
});

export const Index: FC = () => {
    const  auth = useAuth();
    const [isLoadingApp,setLoading] = useState(true);
    
    useEffect(() => {
        if(auth.state?.user){
            setLoading(false);
        }
    }, [auth.state]);
    
    return (
        <>
            {isLoadingApp?
                <div className={"center-block"}>
                    <div>Loading App...</div>
                    <span className="loader "></span>
            </div>:
                <main className={"main-container flex-container w-100"}>
                    <div className={"container flex-container w-100"}>
                        <Menu />
                        <div className={"main-container flex-container w-100 flex-column"}>
                            <Header />
                            <Content />
                        </div>
                    </div>
                </main>}
        </>
    );
}