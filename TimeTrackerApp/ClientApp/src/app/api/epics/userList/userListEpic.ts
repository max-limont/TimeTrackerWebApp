import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, pipe} from "rxjs";
import {getPaginatedUserList, getSearchResponse, getUserCount} from "../../../../graphqlQuery/userList/userListQuery";
import {
    fetchUserCountActionType,
    fetchUserListPageActionType, fetchUserListSearchRequestActionType
} from "../../../../store/actions/userList/userListActions";
import {set_user_list, set_user_list_count} from "../../../../store/slice/user/userListSlice";
import {graphqlRequest} from "../../api";


const fetchUserListPage = (action$: any) =>{
    return action$.pipe(
        ofType(fetchUserListPageActionType),
        mergeMap((action: any) => from(graphqlRequest(getPaginatedUserList, {
            from: action.payload.from,
            to: action.payload.to,
            orderBy: action.payload.orderBy
        }))
            .pipe(
                map(response => {
                    return set_user_list(response.data.userFetchPageList);
                }))));}

const fetchUserCount = (action$: any) =>{
    // console.log(123);
    return action$.pipe(
        ofType(fetchUserCountActionType),
        mergeMap((action: any) => from(graphqlRequest(getUserCount))
            .pipe(
                map(response => {
                    // console.log(response);
                    return set_user_list_count(response.data.userCount);
                }))));}

const fetchUserListSearchResponse = (action$: any) =>{
    // console.log(521);
    return action$.pipe(
        ofType(fetchUserListSearchRequestActionType),
        mergeMap((action: any) => from(graphqlRequest(getSearchResponse, {
            request: action.payload.request
        }))
            .pipe(
                map(response => {
                    console.log(response);
                    return set_user_list(response.data.userFetchSearchList);
                }))));}

export const userListEpics = combineEpics(fetchUserListPage, fetchUserCount, fetchUserListSearchResponse);

