import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import User from "../../type/Models/User";
import "./style.scss"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {UserListPage} from "../../type/User/User";

const UserList = () => {
    const {userList, userListCount} = useTypedSelector(state => {
        return {
            userList: state.rootReducer.userList.userList,
            userListCount: state.rootReducer.userList.count
        }
    })
    console.log(userList)
    const [value, setValue] = useState<UserListPage>({from: 0, to: 3, orderBy: null})
    const {fetchUserList, fetchUserListCount} = useAction()

    useEffect(() => {
        fetchUserList(value)
    }, [])

    // const filteredItems = userList.filter((item) => {
    //     return item.firstName.toLowerCase().includes(value.toLowerCase()) || item.lastName.toLowerCase().includes(value.toLowerCase())
    // })

    // const dispatch = useAppDispatch();
    // const [state, setState] = useState<UserListPage>({from: 0, to: 3, orderBy: null});
    // dispatch(fetchUserListPageAction(state))
    // const userList = useAppSelector(s=>s.rootReducer.userList.userList);

    return <section className="userList">
        <div className="userList-controls">
            <form className="search_form">
                {/*<input*/}
                {/*    type="text"*/}
                {/*    onChange={(event => setValue(event.target.value))}*/}
                {/*    placeholder="Search..."*/}
                {/*/>*/}
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
            {/*{userList.map(*/}
            {/*    (item: User,id) =>*/}
            {/*        <Link key={id} className="link-btn userItem" to={""}>*/}
            {/*            <ul>*/}
            {/*                <span>{item.firstName} {item.lastName}</span>*/}
            {/*                <span>{item.weeklyWorkingTime}</span>*/}
            {/*            </ul>*/}
            {/*        </Link>*/}
            {/*)}*/}
            <div className={"pageButton"}>
                {
                    Array(10).map((value, index) => {
                    return <div key={index}>

                    </div>
                })}
            </div>
        </div>

    </section>
}

export default UserList