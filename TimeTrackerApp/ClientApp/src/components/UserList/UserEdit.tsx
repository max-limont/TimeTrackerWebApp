import React, {CSSProperties, FC, useState} from 'react';
import {changedActivationState, editUserAction} from "../../store/userList/userList.slice";
import {User, UserInputType} from "../../types/user.types";
import {useDispatch} from "react-redux";

const btnStyle: CSSProperties = {
    display: "block",
    cursor: "pointer",
    background: "#d0d0d0",
    width: "fit-content",
    padding: 5
}

const UserEdit: FC<{ item: User, handler(gameId: number): void }> = ({item, handler}) => {
    const [user, setUser] = useState(item)
    const dispatch = useDispatch()
    return (
        <tr key={item.id} className="link-btn userItem">
            <td>
                <input
                    value={user.firstName}
                    onChange={e => {
                        setUser({...user, firstName: e.target.value})
                    }}
                    placeholder={"First Name"}
                    type="text"/>
                <input
                    value={user.lastName}
                    onChange={e => {
                        setUser({...user, lastName: e.target.value})
                    }}
                    placeholder={"Last Name"}
                    type="text"/>
            </td>
            <td>
                <input
                    value={user.email}
                    onChange={e => {
                        setUser({...user, email: e.target.value})
                    }}
                    placeholder={"Email"}
                    type="text"/>
            </td>
            <td>
                <input
                    value={user.weeklyWorkingTime}
                    onChange={e => {
                        setUser({...user, weeklyWorkingTime: Number(e.target.value)})
                    }}
                    placeholder={"Weekly Working Time"}
                    type="number"/>
            </td>
            <td>
                <div
                    style={btnStyle}
                    onClick={() => setUser({
                    ...user,
                    isFullTimeEmployee: !user.isFullTimeEmployee
                })}>{user.isFullTimeEmployee ? "Full-time" : "Part-time"}</div>
            </td>
            <td>
                <button onClick={e => {
                    e.preventDefault()
                    handler(0)
                }}>Cancel
                </button>
                <button onClick={e => {
                    e.preventDefault()
                    dispatch(editUserAction(user))
                    handler(0)
                }}>Edit
                </button>
            </td>
        </tr>
    );
};

export default UserEdit;