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
                return setUserList(response.data.userFetchPageList);
            })
        ))
    )
}

const fetchUserCountEpic: Epic = (action$: Observable<ReturnType<typeof fetchUserCount>>): any => {
    return action$.pipe(
        ofType(fetchUserCount.type),
        mergeMap(action => from(graphqlRequest(getUserCount)).pipe(
            map(response => {
                return setUserListCount(response.data.userCount);
            })
        ))
    )
}

const fetchUserListSearchResponseEpic: Epic = (action$: Observable<ReturnType<typeof fetchUserListSearchRequest>>): any => {
    return action$.pipe(
        ofType(fetchUserListSearchRequest.type),
        mergeMap(action => from(graphqlRequest(getSearchResponse, {request: action.payload.request})).pipe(
            map(response => {
                return setUserList(response.data.userFetchSearchList);
            })
        ))
    )
}

export const userListEpics = combineEpics(fetchUserListPageEpic, fetchUserCountEpic, fetchUserListSearchResponseEpic);

