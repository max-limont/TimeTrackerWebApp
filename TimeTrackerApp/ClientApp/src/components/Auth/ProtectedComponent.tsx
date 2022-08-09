import {FC} from "react";
import {Navigate } from "react-router-dom";
import {getCookie, refreshTokenKey} from "../../Cookie/Cookie";

type ProtectedComponentPropsType = {
    component: any
}

export const ProtectedComponent: FC<ProtectedComponentPropsType> = (props): any => {

    const refreshToken = getCookie(refreshTokenKey)
    const {component} = props

    return (refreshToken) ? ( component ) : (<Navigate to={'/login'} replace />)
}