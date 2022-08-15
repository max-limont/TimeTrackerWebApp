import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import User from "../../type/Models/User";
import "./styles/style.scss"
import {UserListPage} from "../../type/User/User";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    fetchUserCountAction,
    fetchUserListPageAction,
    fetchUserListSearchRequestAction
} from "../../store/actions/userList/userListActions";
import Select from "./Select";
import ExportXlsx from "./ExportXlsx";
import Pagination from "./Pagination";

const UserList = () => {
    const {userList, count} = useAppSelector(state => state.rootReducer.userList);

    const contentPerPage = 5

    const dispatch = useAppDispatch()
    const [state, setState] = useState<UserListPage>({
        from: 0,
        contentPerPage,
        orderBy: "Id",
        isReverse: false
    })

    const [request, setSearch] = useState<string>("")

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
        dispatch(fetchUserCountAction())
    }, [])

    useEffect(() => {
        if (request.length)
            dispatch(fetchUserListSearchRequestAction({request}))
        else
            dispatch(fetchUserListPageAction(state))
    }, [request, state])

    return <section className="userList">
        <div className="userList-controls">
            <form className="search_form">
                <input
                    type="text"
                    onChange={(event => setSearch(event.target.value))}
                    placeholder="Search..."
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className={"icon"}/>
            </form>

            <div className="userList-controls-group">
                {
                    request.length
                        ? null
                        : <>
                            <ExportXlsx count={count} isReverse={state.isReverse}
                                        orderBy={state.orderBy}/>
                            <span>Sort by:</span>
                            <Select options={selectOptions}
                                    selectHandler={selectHandler}/>
                        </>
                }
                <Link className="link-btn addUser" to=" ">Add</Link>
            </div>
        </div>

        <table className="userList-list">
            <thead>
            <tr className="userList-list-title">
                <th>Name</th>
                <th>Email</th>
                <th>Weekly Working Time</th>
            </tr>
            </thead>
            <tbody>
            {
                userList
                    ? userList.map(
                    (item: User) =>
                        <tr onClick={() => document.location = "user?id=" + item.id} key={item.id} className="link-btn userItem">
                            <td>{item.firstName} {item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.weeklyWorkingTime}</td>
                        </tr>
                    )
                    : null
            }
            </tbody>
        </table>
        {
            request.length
                ? null
                : <Pagination contentPerPage={contentPerPage} count={count}
                              setFirstContentIndex={firstContentIndexHandler}/>
        }

    </section>
}

export default UserList