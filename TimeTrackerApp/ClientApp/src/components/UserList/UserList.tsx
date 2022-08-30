import React, {FC, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {User} from "../../types/user.types";
import {Select} from "./Select";
import ExportXlsx from "./ExportXlsx";
import Pagination from "./Pagination";
import {useAuth} from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {UserListPage} from "../../types/userList.types";
import {fetchUserCount, fetchUserListPage, fetchUserListSearchRequest} from "../../store/userList/userList.slice";

export const UserList: FC = () => {
    const {userList, count} = useAppSelector(state => state.rootReducer.userList);
    const auth = useAuth();
    const contentPerPage = 2;

    const dispatch = useDispatch()
    const [state, setState] = useState<UserListPage>({
        from: 0,
        contentPerPage: contentPerPage,
        orderBy: "Id",
        isReverse: false,
    } as UserListPage)

    const [request, setSearch] = useState<string>("")

    const navigate = useNavigate()

    const selectHandler = (settings: { orderBy: string, isReverse: boolean }) => {
        setState({...state, ...settings})
    }
    const firstContentIndexHandler = (index: number) => {
        setState({...state, from: index})
    }

    const selectOptions = [
        {label: "First Name A-Z", value: {orderBy: "FirstName", isReverse: false}},
        {label: "First Name Z-A", value: {orderBy: "FirstName", isReverse: true}},
        {label: "Last Name A-Z", value: {orderBy: "LastName", isReverse: false}},
        {label: "Last Name Z-A", value: {orderBy: "LastName", isReverse: true}},
        {label: "Email A-Z", value: {orderBy: "Email", isReverse: false}},
        {label: "Email Z-A", value: {orderBy: "Email", isReverse: true}},
        {label: "Weekly Working Time Min↓", value: {orderBy: "WeeklyWorkingTime", isReverse: false}},
        {label: "Weekly Working Time Max↓", value: {orderBy: "WeeklyWorkingTime", isReverse: true}}
    ]

    useEffect(() => {
        if (auth.state?.isUserAuthenticated) {
            dispatch(fetchUserCount())
        }
    }, [auth])

    useEffect(() => {
        if (auth.state?.isUserAuthenticated) {
            dispatch(request.length ? fetchUserListSearchRequest({request}) : fetchUserListPage(state))
        }
    }, [request, state, auth])

    return (
        <section className={"user-list flex-container flex-column w-100"}>
            <div className={"user-list-controls flex-container flex-wrap"}>
                <form className={"search-form flex-container align-items-center w-100"}>
                    <div className={'form-group w-100'}>
                        <div className={"form-item w-100"}>
                            <label>Search users: </label>
                            <input type={"text"} onChange={event => setSearch(event.target.value)} />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={"icon"}/>
                        </div>
                    </div>
                </form>
                <div className={"user-list-controls-group flex-container align-items-center"}>
                    <span>Sort by:</span>
                    <Select options={selectOptions} selectHandler={selectHandler}/>
                    <ExportXlsx count={count} isReverse={state.isReverse} orderBy={state.orderBy}/>
                    <a className="link-btn addUser button cyan-button">Create user</a>
                </div>
            </div>
            <table className={"user-list-list"}>
                <thead>
                    <tr className={"userList-list-title"}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Weekly Working Time</th>
                    </tr>
                </thead>
                <tbody>
                    { userList &&
                        userList.map((item: User) => (
                            <tr onClick={() => navigate("/user/" + item.id, )} key={item.id} className="link-btn userItem">
                                <td>{item.firstName} {item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.weeklyWorkingTime}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            { !request.length &&
                <Pagination contentPerPage={contentPerPage} count={count} setFirstContentIndex={firstContentIndexHandler}/>
            }
        </section>
    )
}