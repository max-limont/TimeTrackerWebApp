import React, {FC} from 'react';
import {deleteUserAction, editUserAction} from "../../store/userList/userList.slice";
import {User} from "../../types/user.types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const UserItem: FC<{item: User, handler(gameId: number): void}> = ({item, handler}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (
        <tr className="link-btn userItem">
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.firstName} {item.lastName}</td>
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.email}</td>
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.weeklyWorkingTime}</td>
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.isFullTimeEmployee ? "Full-time" : "Part-time"}</td>
            <td>
                <button onClick={e => {
                    e.preventDefault()
                    handler(item.id)
                    // window.location.reload()
                }}>Edit
                </button>

                <button onClick={e => {
                    e.preventDefault()
                    dispatch(deleteUserAction(item.id))
                    // window.location.reload()
                }}>Delete
                </button>
            </td>
        </tr>
    );
};

export default UserItem;