import { createAction } from "@reduxjs/toolkit";
import {AuthLoginInputType, AuthRefreshInputType} from "../../../graphqlQuery/auth/authQuery";

export const AuthLoginActionType = "AuthLogin";
export const AuthRefreshActionType = "AuthRefresh";
export const AuthLogoutActionType = "AuthLogout";

export const authLoginAction = createAction<AuthLoginInputType>(AuthLoginActionType);
export const authRefreshAction = createAction<AuthRefreshInputType>(AuthRefreshActionType);
export const authLogoutAction = createAction<number>(AuthLogoutActionType);