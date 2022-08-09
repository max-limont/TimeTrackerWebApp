import { createAction } from "@reduxjs/toolkit";
import {UserListPage} from "../../../type/User/User";
import User from "../../../type/Models/User";

export const fetchUserListPageActionType = "fetchUserListPage";
export const fetchUserCountActionType = "fetchUserCount";
export const fetchUserListSearchRequestActionType = "fetchUserListSearchResponse";



export const fetchUserListPageAction = createAction<UserListPage>(fetchUserListPageActionType);
export const fetchUserCountAction = createAction(fetchUserCountActionType);
export const fetchUserListSearchRequestAction = createAction<string>(fetchUserListSearchRequestActionType);