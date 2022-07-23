import {FC} from "react";
import {Timer} from "./Timer";

export const Home: FC = () => {

    return (
        <div className={"flex-container flex-column w-100"}>
            <section className={"timer-container"}>
                <header>
                    <h2>Timer</h2>
                    <a className={"button timer-button cyan-button"}>Start</a>
                </header>
                <div className={"section-content"}>
                    <Timer />
                </div>
            </section>
        </div>
    );
}
