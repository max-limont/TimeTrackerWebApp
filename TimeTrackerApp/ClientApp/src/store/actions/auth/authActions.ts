import { createAction } from "@reduxjs/toolkit";
import { AuthUser } from "../../../type/User/AuthUser";

export const authUserActionType = "authUser";



export const authUserAction =createAction<AuthUser>(authUserActionType);