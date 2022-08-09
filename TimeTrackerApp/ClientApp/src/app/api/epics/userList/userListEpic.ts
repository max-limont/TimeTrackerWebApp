import { combineEpics, Epic, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { usebaseQueryWithReauth, defaultRequest } from "../../api";
import {getPaginatedUserList} from "../../../../graphqlQuery/userList/userListQuery";
import {fetchUserListPageActionType} from "../../../../store/actions/userList/userListActions";
import {set_user_list} from "../../../../store/slice/user/userListSlice";


const fetchUserListPage = (action$: any) =>{
    console.log(123);
    return action$.pipe(
        ofType(fetchUserListPageActionType),
        mergeMap((action: any) => from(usebaseQueryWithReauth(getPaginatedUserList, {
            from: action.payload.from,
            to: action.payload.to,
            orderBy: action.payload.orderBy
        }))
            .pipe(
                map(response => {
                    console.log(response);
                    return set_user_list(response);
                }))));}

export const userListEpics = combineEpics(fetchUserListPage);

