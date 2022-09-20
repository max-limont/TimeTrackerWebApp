import React, {FC, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {User} from "../../types/user.types";
import {Select} from "./Select";
import ExportXlsx from "./ExportXlsx";
import Pagination from "./Pagination";
import {useAuth} from "../../hooks/useAuth";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useDispatch} from "react-redux";
import {UserListPage} from "../../types/userList.types";

import {
    fetchUserCount,
    fetchUserListPage,
    fetchUserListSearchRequest
} from "../../store/userList/userList.slice";
import UserEdit from "./UserEdit";
import UserItem from "./UserItem";
import ExportPdf from "./ExportPdf";

export const UserList: FC = () => {
    const {userList, count} = useAppSelector(state => state.rootReducer.userList);
    const auth = useAuth();
    const contentPerPage = 10;
    const onlineUsers = useAppSelector(s => s.rootReducer.signal.usersOnline);
    const dispatch = useDispatch()
    const [state, setState] = useState<UserListPage>({
        from: 0,
        contentPerPage: contentPerPage,
        orderBy: "Id",
        isReverse: false,
    } as UserListPage)

    const [request, setSearch] = useState<string>("")

    const [userIdForEdit, setUserIdForEdit] = useState<number>(0)

    const selectHandler = (settings: { orderBy: string, isReverse: boolean }) => {
        setState({...state, ...settings})
    }
    const firstContentIndexHandler = (index: number) => {
        setState({...state, from: index})
    }

    const userActionHandler = (gameId: number) => {
        setUserIdForEdit(gameId)
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
            console.log(request)
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
                            <input type={"text"} onChange={event => setSearch(event.target.value)}/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={"icon"}/>
                        </div>
                    </div>
                </form>
                <div className={"user-list-controls-group flex-container align-items-center"}>
                    <span>Sort by:</span>
                    <Select options={selectOptions} selectHandler={selectHandler}/>
                    <div className={"dropdown"}>
                        <button className="dropbtn dark-button">Export Data</button>
                        <div className={"dropdown-content"}>
                            <ExportXlsx isReverse={state.isReverse} orderBy={state.orderBy}/>
                            <ExportPdf isReverse={state.isReverse} orderBy={state.orderBy}/>
                        </div>
                    </div>
                    <Link to={"/user-create"} className="button cyan-button">Create user</Link>
                </div>
            </div>
            <div className={'user-list-container'}>
                <div className={'user-list-container-header'}>
                    <h3>List of employees:</h3>
                </div>
                <table className={"user-list-table w-100"}>
                    <thead>
                    <tr className={"userList-list-title"}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Working Time</th>
                        <th>Full-time/Part-time</th>
                        <th style={{width: 250}}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList &&
                        userList.map((item: User) => (
                            item.id == userIdForEdit
                                ? <UserEdit key={item.id} item={item} handler={userActionHandler}/>
                                : <UserItem key={item.id} item={item} handler={userActionHandler}/>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            {!request.length &&
            <Pagination contentPerPage={contentPerPage} count={count} setFirstContentIndex={firstContentIndexHandler}/>
            }
        </section>
    )
}