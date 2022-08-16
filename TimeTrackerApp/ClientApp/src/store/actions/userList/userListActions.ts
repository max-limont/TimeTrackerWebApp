import { createAction } from "@reduxjs/toolkit";
import {UserListPage} from "../../../type/User/User";

export const fetchUserListPageActionType = "fetchUserListPage";
export const fetchUserCountActionType = "fetchUserCount";
export const fetchUserListSearchRequestActionType = "fetchUserListSearchRequest";



export const fetchUserListPageAction = createAction<UserListPage>(fetchUserListPageActionType);
export const fetchUserCountAction = createAction(fetchUserCountActionType);
export const fetchUserListSearchRequestAction = createAction<{request: string}>(fetchUserListSearchRequestActionType);