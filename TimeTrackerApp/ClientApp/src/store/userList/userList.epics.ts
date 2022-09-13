import {combineEpics, Epic, ofType} from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import {getPaginatedUserList, getSearchResponse, getUserCount} from "../../graphql/queries/userList.queries";
import {
    insertCreatedUser,
    createUserAction,
    fetchUserCount,
    fetchUserListPage, fetchUserListSearchRequest,
    setUserList,
    setUserListCount, deleteUserAction, deleteUser, editUserAction, editUser, fetchExportData, setExportData
} from "./userList.slice";
import {graphqlRequest} from "../../graphql/api";
import {Action} from "react-epics";
import {createUserQuery, deleteUserQuery, editUserQuery} from "../../graphql/queries/user.queries";

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
const fetchExportDataEpic: Epic = (action$: Observable<ReturnType<typeof fetchExportData>>): any => {
    return action$.pipe(
        ofType(fetchExportData.type),
        mergeMap(action => from(graphqlRequest(getPaginatedUserList, {
            from: 0,
            contentPerPage: action.payload.contentPerPage,
            orderBy: action.payload.orderBy,
            isReverse: action.payload.isReverse
        })).pipe(
            map(response => {
                if (response?.data?.userFetchPageList) {
                    return setExportData(response.data.userFetchPageList);
                }
                return {type: 'FetchExportDataError', payload: 'Error'} as Action
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

const createUserEpic: Epic = (action$: Observable<ReturnType<typeof createUserAction>>): any => {
    return action$.pipe(
        ofType(createUserAction.type),
        mergeMap(action => from(graphqlRequest(createUserQuery, {userInput: action.payload})).pipe(
            map(response => {
                console.log(response)
                if (response.data.createUser) {
                    return insertCreatedUser(response.data.createUser)
                }
                return {type: 'CreateUserError', payload: 'Error'} as Action
            })
        ))
    )
}
const editUserEpic: Epic = (action$: Observable<ReturnType<typeof editUserAction>>): any => {
    return action$.pipe(
        ofType(editUserAction.type),
        mergeMap(action => from(graphqlRequest(editUserQuery, {userInput: action.payload})).pipe(
            map(response => {
                console.log(action.payload)
                console.warn(response.data)
                if (response.data.editUser) {
                    return editUser(response.data.editUser)
                }
                return {type: 'CreateUserError', payload: 'Error'} as Action
            })
        ))
    )
}

const deleteUserEpic: Epic = (action$: Observable<ReturnType<typeof deleteUserAction>>): any => {
    return action$.pipe(
        ofType(deleteUserAction.type),
        mergeMap(action => from(graphqlRequest(deleteUserQuery, {id: action.payload})).pipe(
            map(response => {
                console.log(response)
                if (response.data.deleteUser) {
                    return deleteUser(response.data.deleteUser)
                }
                return {type: 'CreateUserError', payload: 'Error'} as Action
            })
        ))
    )
}

export const userListEpics = combineEpics(
    fetchUserListPageEpic,
    fetchExportDataEpic,
    fetchUserCountEpic,
    fetchUserListSearchResponseEpic,
    createUserEpic,
    deleteUserEpic,
    editUserEpic
);

