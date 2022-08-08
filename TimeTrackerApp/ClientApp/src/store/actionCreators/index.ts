import * as UserListActionCreators from "./userList"
import { timeTrackerSlice } from "../slice/timeTracker/timeTrackerSlice"


export default {
    ...UserListActionCreators,
    ...timeTrackerSlice.actions
}