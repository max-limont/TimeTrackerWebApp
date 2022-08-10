import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import User from "../../type/Models/User";
import "./style.scss"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {UserListPage} from "../../type/User/User";
import {useActions} from "../../hooks/useActions";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
    fetchUserCountAction,
    fetchUserListPageAction,
    fetchUserListSearchRequestAction
} from "../../store/actions/userList/userListActions";
import usePagination from "../../hooks/usePagination";

const UserList = () => {
    const {userList, count} = useAppSelector(state => state.rootReducer.userList);
    const contentPerPage = 10

    const {
        firstContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage,
        count,
    });


    const dispatch = useAppDispatch()
    const [state, setState] = useState<UserListPage>({from: firstContentIndex, to: contentPerPage, orderBy: "Id"})
    const [search, setSearch] = useState<string>("")
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (loaded) {
            setState({...state, from: firstContentIndex, to: contentPerPage})
            setLoaded(false)
        }

        dispatch(fetchUserCountAction())
        if (search.length)
            dispatch(fetchUserListSearchRequestAction(search))
        else
            dispatch(fetchUserListPageAction(state))
    }, [search, loaded])


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
                <div className="filter">

                </div>

                <Link className="link-btn addUser" to=" ">Add</Link>
            </div>
        </div>

        <div className="userList-list">
            <div className="userList-list-title">
                <span>Name</span>
                <span>Email</span>
                <span>Weekly Working Time</span>
            </div>
            {
                userList
                    ? userList.map(
                    (item: User) =>
                        <Link key={item.id} className="link-btn userItem" to={""}>
                            <ul>
                                <span>{item.id}</span>
                                <span>{item.firstName} {item.lastName}</span>
                                <span>{item.email}</span>
                                <span>{item.weeklyWorkingTime}</span>
                            </ul>
                        </Link>
                    )
                    : null
            }

            {
                totalPages > 1
                    ? <div className="pagination">
                        <p className="text">
                            {page}/{totalPages}
                        </p>
                        <button onClick={() => {
                            prevPage()
                            setLoaded(true)
                        }} className="page">
                            &larr;
                        </button>
                        {/* @ts-ignore */}
                        {[...Array(totalPages).keys()].map((el) => (
                            <button
                                onClick={() => {
                                    setPage(el + 1)
                                    setLoaded(true)
                                }}
                                key={el}
                                className={`page ${page === el + 1 ? "active" : ""}`}
                            >
                                {el + 1}
                            </button>
                        ))}
                        <button onClick={() => {
                            nextPage()
                            setLoaded(true)
                        }} className="page">
                            &rarr;
                        </button>
                    </div>
                    : null
            }

        </div>

    </section>
}

export default UserList