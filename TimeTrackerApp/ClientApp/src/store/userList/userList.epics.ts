import { combineEpics, Epic, ofType } from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {getPaginatedUserList, getSearchResponse, getUserCount} from "../../graphql/queries/userList.queries";
import {
    fetchUserCount,
    fetchUserListPage, fetchUserListSearchRequest,
    setUserList,
    setUserListCount
} from "./userList.slice";
import {graphqlRequest} from "../../graphql/api";
import {Action} from "react-epics";

const fetchUserListPageEpic: Epic = (action$: Observable<ReturnType<typeof fetchUserListPage>>): any => {
    return action$.pipe(
        ofType(fetchUserListPage.type),
        mergeMap(action => from(graphqlRequest(getPaginatedUserList, {
            from: action.payload.from,
            contentPerPage: action.payload.contentPerPage,
            orderBy: action.payload.orderBy,
            isReverse: action.payload.isReverse
        })).pipe(
            map(response => {
                if (response?.data?.userFetchPageList) {
                    return setUserList(response.data.userFetchPageList);
                }
                return {type: 'FetchUserListPageError', payload: 'Error'} as Action
            })
        ))
    )
}

const fetchUserCountEpic: Epic = (action$: Observable<ReturnType<typeof fetchUserCount>>): any => {
    return action$.pipe(
        ofType(fetchUserCount.type),
        mergeMap(action => from(graphqlRequest(getUserCount)).pipe(
            map(response => {
                if (response?.data?.userCount) {
                    return setUserListCount(response.data.userCount);
                }
                return {type: 'FetchUserCountError', payload: 'Error'} as Action
            })
        ))
    )
}

const fetchUserListSearchResponseEpic: Epic = (action$: Observable<ReturnType<typeof fetchUserListSearchRequest>>): any => {
    return action$.pipe(
        ofType(fetchUserListSearchRequest.type),
        mergeMap(action => from(graphqlRequest(getSearchResponse, {request: action.payload.request})).pipe(
            map(response => {
                if (response.data.userFetchSearchList) {
                    return setUserList(response.data.userFetchSearchList);
                }
                return {type: 'FetchUserListSearchResponseError', payload: 'Error'} as Action
            })
        ))
    )
}

export const userListEpics = combineEpics(fetchUserListPageEpic, fetchUserCountEpic, fetchUserListSearchResponseEpic);

