import {FC} from "react";
import {Home} from "./Home";

export const Content: FC = () => {

    return (
        <div className={"content-container flex-container w-100"}>
            <Home />
        </div>
    );
}