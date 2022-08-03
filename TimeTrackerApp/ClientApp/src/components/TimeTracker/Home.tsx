import {FC} from "react";
import {TimeTracker} from "./TimeTracker";
import {TimeTrackerList} from "./TimeTrackerList";

export const Home: FC = () => {

    return (
        <div className={"flex-container flex-column w-100"}>
            <section className={"time-tracker-container"}>
                <header>
                    <h2>Time Tracker</h2>
                </header>
                <div className={"section-content"}>
                    <TimeTracker />
                    <TimeTrackerList />
                </div>
            </section>
        </div>
    );
};