import {Dispatch} from "redux";
import {setUserListCount, userListError, setUserList} from "../slice/user/userListSlice";
import testData from "./testData";
import {getPaginatedUserList, getUserCount} from "../../graphqlQuery/userList/userListQuery";
import {UserListPage} from "../../type/User/User";
import {graphqlRequest} from "../../app/api/api";

export const fetchUserListCount = () => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await graphqlRequest(getUserCount, {})
            dispatch(setUserListCount(data))
        }
        catch (e){
            console.log(e)
            dispatch(userListError("Can't fetch"))
        }
    }
}

export const fetchUserList = (variables:UserListPage) => {
    return async (dispatch: Dispatch) => {
        try {
            const data = await graphqlRequest(getPaginatedUserList, variables)
            dispatch(setUserList(data))
        }catch (e){
            console.log(e)
            dispatch(userListError("Can't fetch"))
        }
    }
}
