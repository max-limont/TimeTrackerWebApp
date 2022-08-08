import {FC} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTriangleExclamation, faCircleQuestion, faCircleInfo, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export enum MessageTypes {
    Error,
    Warning,
    Success,
    Info,
    Question
}

type ErrorMessagePropsType = {
    type: MessageTypes
    message?: string | null
}

export const Message: FC<ErrorMessagePropsType> = (props) => {

    let icon = faCircleInfo;
    const messageClassName = MessageTypes[props.type].toLowerCase()

    switch (props.type) {
        case MessageTypes.Error:
            icon = faCircleXmark
            break
        case MessageTypes.Success:
            icon = faCircleCheck
            break
        case MessageTypes.Info:
            icon = faCircleInfo
            break
        case MessageTypes.Warning:
            icon = faTriangleExclamation
            break
        case MessageTypes.Question:
            icon = faCircleQuestion
            break;
    }

    return (
        <div className={`message ${messageClassName}`}>
            <FontAwesomeIcon icon={icon} className={"icon"} />
            <p>{props.message}</p>
        </div>
    );
}