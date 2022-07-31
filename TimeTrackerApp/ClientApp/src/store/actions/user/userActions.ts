import { createAction } from "@reduxjs/toolkit";
import { AuthorizationUser, AuthUserResponse } from "../../../type/User/AuthUser";

export const fetchUserByIdActionType = "fetchUserById";



export const fetchUserByIdAction = createAction<number>(fetchUserByIdActionType);