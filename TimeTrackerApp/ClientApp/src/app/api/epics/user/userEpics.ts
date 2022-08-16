import { combineEpics, ofType } from "redux-observable";
import { from, map, mergeMap } from "rxjs";
import { graphqlRequest } from "../../api";
import { setUser } from "../../../../store/slice/authentication/authSlice";
import { fetchUserByIdActionType } from "../../../../store/actions/user/userActions";
import {getUserByIdQuery} from "../../../../graphqlQuery/user/userQuery";
import {User} from "../../../../type/User/User";


const getUserById = (action$: any) => {
    return action$.pipe(
        ofType(fetchUserByIdActionType),
        mergeMap((action: any) => from(graphqlRequest(getUserByIdQuery, {
            id: action.payload
        })).pipe(
            map(response => {
                if (response?.data?.getUserById) {
                    const apiResponse = response.data.getUserById
                    const user = {
                        id: parseInt(apiResponse.id),
                        email: apiResponse.email ?? "",
                        firstName: apiResponse.firstName ?? "Unknown",
                        lastName: apiResponse.lastName ?? "User",
                        isFullTimeEmployee: Boolean(JSON.parse(apiResponse.isFullTimeEmployee)),
                        weeklyWorkingTime: parseInt(apiResponse.weeklyWorkingTime ?? ''),
                        remainingVacationDays: parseInt(apiResponse.remainingVacationDays ?? ''),
                        privilegesValue: parseInt(apiResponse.privilegesValue ?? '')
                    } as User
                    return setUser(user);
                }
            })
        )));
}

export const userEpics = combineEpics(getUserById);

