import { createAction } from "@reduxjs/toolkit";

export const fetchUserByIdActionType = "fetchUserById";
export const fetchUserByIdAction = createAction<number>(fetchUserByIdActionType);