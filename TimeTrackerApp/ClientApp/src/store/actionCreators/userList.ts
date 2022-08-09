import {Dispatch} from "redux";
import {set_user_list_count, user_list_error, set_user_list} from "../slice/user/userListSlice";
import testData from "./testData";
import {getPaginatedUserList, getUserCount} from "../../graphqlQuery/userList/userListQuery";
import {UserListPage} from "../../type/User/User";
import {graphqlRequest} from "../../app/api/api";

export const fetchUserListCount = () => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await graphqlRequest(getUserCount, {})
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
            const data = await graphqlRequest(getPaginatedUserList, variables)
            dispatch(set_user_list(data))
        }catch (e){
            console.log(e)
            dispatch(user_list_error("Can't fetch"))
        }
    }
}
