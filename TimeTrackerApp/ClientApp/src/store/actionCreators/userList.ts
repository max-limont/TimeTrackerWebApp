import {Dispatch} from "redux";
import {fetch_userList, fetch_userList_error, fetch_userList_success} from "../slice/user/userListSlice";
import testData from "./testData";


export const fetchUserList = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetch_userList())
            const data = testData
            dispatch(fetch_userList_success(data))
        }catch (e){
            console.log(e)
            dispatch(fetch_userList_error("Can't fetch"))
        }
    }
}