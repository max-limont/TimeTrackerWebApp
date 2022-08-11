import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, pipe} from "rxjs";
import {getPaginatedUserList, getSearchResponse, getUserCount} from "../../../../graphqlQuery/userList/userListQuery";
import {
    fetchUserCountActionType,
    fetchUserListPageActionType, fetchUserListSearchRequestActionType
} from "../../../../store/actions/userList/userListActions";
import {setUserList, setUserListCount} from "../../../../store/slice/user/userListSlice";
import {graphqlRequest} from "../../api";


const fetchUserListPage = (action$: any) =>{
    return action$.pipe(
        ofType(fetchUserListPageActionType),
        mergeMap((action: any) => from(graphqlRequest(getPaginatedUserList, {
            from: action.payload.from,
            contentPerPage: action.payload.contentPerPage,
            orderBy: action.payload.orderBy,
            isReverse: action.payload.isReverse
        }))
            .pipe(
                map(response => {
                    return setUserList(response.data.userFetchPageList);
                }))));}

const fetchUserCount = (action$: any) =>{
    return action$.pipe(
        ofType(fetchUserCountActionType),
        mergeMap((action: any) => from(graphqlRequest(getUserCount))
            .pipe(
                map(response => {
                    return setUserListCount(response.data.userCount);
                }))));}

// Работоспособность спорная
const fetchUserListSearchResponse = (action$: any) =>{
    return action$.pipe(
        ofType(fetchUserListSearchRequestActionType),
        mergeMap((action: any) => from(graphqlRequest(getSearchResponse, {request: action.payload.request}))
            .pipe(
                map(response => {
                    console.log(response);
                    return setUserList(response.data.userFetchSearchList);
                }))));}

export const userListEpics = combineEpics(fetchUserListPage, fetchUserCount, fetchUserListSearchResponse);

