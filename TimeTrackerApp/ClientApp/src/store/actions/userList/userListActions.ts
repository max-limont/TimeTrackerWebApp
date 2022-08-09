import { createAction } from "@reduxjs/toolkit";
import {UserListPage} from "../../../type/User/User";

export const fetchUserListPageActionType = "fetchUserListPage";



export const fetchUserListPageAction = createAction<UserListPage>(fetchUserListPageActionType);