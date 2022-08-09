import {Dispatch} from "redux";
import {set_user_list_count, user_list_error, set_user_list} from "../slice/user/userListSlice";
import testData from "./testData";
import {usebaseQueryWithReauth} from "../../app/api/api";
import {getPaginatedUserList, getUserCount} from "../../graphqlQuery/userList/userListQuery";
import {UserListPage} from "../../type/User/User";

export const fetchUserListCount = () => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await usebaseQueryWithReauth(getUserCount, {})
            dispatch(set_user_list_count(data))
        }
        catch (e){
            console.log(e)
            dispatch(user_list_error("Can't fetch"))
        }
    }
}

export const fetchUserList = (variables:UserListPage) => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await usebaseQueryWithReauth(getPaginatedUserList, variables)
            dispatch(set_user_list(data))
        }catch (e){
            console.log(e)
            dispatch(user_list_error("Can't fetch"))
        }
    }
}