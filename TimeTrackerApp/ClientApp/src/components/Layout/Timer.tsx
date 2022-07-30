import {FC} from "react";

export const Timer: FC = () => {

    return (
        <div className={"timer"}>
            <div className={"hours"}>
                <span>04</span>
                <h3>hours</h3>
            </div>
            <div className={"minutes"}>
                <span>39</span>
                <h3>minutes</h3>
            </div>
            <div className={"seconds"}>
                <span>12</span>
                <h3>seconds</h3>
            </div>
        </div>
    );
}