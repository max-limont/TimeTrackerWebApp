import { CalendarGrid } from "./CalendarGrid";
import {FC} from "react";

export const Calendar: FC = () => {

    return (
        <section className={"calendar-container flex-container flex-column w-100"}>
            <CalendarGrid />
        </section>
    )
}