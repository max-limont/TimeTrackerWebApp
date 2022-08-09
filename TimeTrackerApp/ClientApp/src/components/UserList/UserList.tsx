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

const UserList = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState<UserListPage>({from: 0, to: 10, orderBy: null});
    const [search, setSearch] = useState<string>("");
    const {userList, count} = useAppSelector(state => state.rootReducer.userList);

    useEffect(() => {
        dispatch(fetchUserCountAction())
        if (search.length < 2)
            dispatch(fetchUserListPageAction(state))
        else
            dispatch(fetchUserListSearchRequestAction(search))
    }, [search])
    // console.log("Count " + count)
    // console.log(userList)

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
                <span>Weekly Working Time</span>
            </div>
            {
                userList
                    ? userList.map(
                    (item: User) =>
                        <Link key={item.id} className="link-btn userItem" to={""}>
                            <ul>
                                <span>{item.firstName} {item.lastName}</span>
                                <span>{item.weeklyWorkingTime}</span>
                            </ul>
                        </Link>
                    )
                    : null
            }
            {/*<div className={"pageButtons"}>*/}
            {/*    {*/}
            {/*        Array(Math.ceil(count / 2)).map((value, index) => {*/}
            {/*        return <div className={"pageButtons-elem"} key={index}>*/}
            {/*            {index}*/}
            {/*        </div>*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>

    </section>
}

export default UserList