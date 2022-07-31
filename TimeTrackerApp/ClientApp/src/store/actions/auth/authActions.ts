import { createAction } from "@reduxjs/toolkit";
import { AuthorizationUser, AuthUserResponse } from "../../../type/User/AuthUser";

export const authUserActionType = "authUser";



export const authUserAction =createAction<AuthorizationUser>(authUserActionType);