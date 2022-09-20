import React, {FC} from 'react';
import {changedActivationState, editUserAction} from "../../store/userList/userList.slice";
import {User, UserInputType} from "../../types/user.types";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const UserItem: FC<{item: User, handler(gameId: number): void}> = ({item, handler}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(item.activation)
    return (
        <tr className="link-btn user-item">
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.firstName} {item.lastName}</td>
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.email}</td>
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.weeklyWorkingTime} minutes</td>
            <td style={{cursor: "pointer"}} onClick={() => navigate("/user/" + item.id,)}>{item.isFullTimeEmployee ? "Full-time" : "Part-time"}</td>
            <td>
                <button className={'button yellow-button'} onClick={e => {
                    e.preventDefault()
                    handler(item.id!)
                    // window.location.reload()
                }}>Edit
                </button>

                <button className={'button red-button'} onClick={e => {
                    e.preventDefault()
                    dispatch(changedActivationState({
                        id: item.id,
                        activation: !item.activation
                    } as User));
                    // window.location.reload()
                }}>{item.activation?"Deactivate":"Active"}
                   
                </button>
            </td>
        </tr>
    );
};

export default UserItem;