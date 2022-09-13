import {Header} from "./Header";
import {Menu} from "./Menu";
import {FC} from "react";
import {Content} from "./Content";
import connection from "../../store/signalr";


window.addEventListener("close", ()=>{
    connection.invoke("Test");
});

export const Index: FC = () => {

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