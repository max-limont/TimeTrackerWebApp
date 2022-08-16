import {FC} from "react";

export const Loading: FC = () => {
    return (
        <div className={"loading-container flex-container flex-column justify-content-center align-items-center w-100 h-fullscreen"} >
            <img src={`${process.env.PUBLIC_URL}/images/loading.jpg`} width={"128px"} height={"128px"} alt="loading" />
        </div>
    )
}