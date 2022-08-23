import React, {FC, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import userPage from "./userpage.module.scss";
import {useDispatch} from "react-redux";
import {getUserById} from "../../store/user/user.slice";
import {useAppSelector} from "../../hooks/useAppSelector";


export const UserPage: FC = () => {

    const auth = useAuth()
    const user = useAppSelector((x) => x.rootReducer.user.user)
    const authuser = auth.state?.user
    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch()
    useEffect(() => {
        if (authuser)
        {
            if (id)
            dispatch(getUserById(parseInt(id) ?? 0))
        }
    }, [auth])
    return (
        <div className={userPage.userForm}>



            <form className={userPage.editForm}>
                <div className={userPage.row}>
                    <img src={`${process.env.PUBLIC_URL}/images/ava.jpg`} alt={"user-profile-image"}/>
                        <div className={userPage.infoContainerAbsolute}>
                            <label className={userPage.nameLabel}>{user.firstName} </label>
                            <label className={userPage.nameLabel}>{user.lastName}</label>
                            <div className={userPage.typeOfWork}>
                                {
                                    user.isFullTimeEmployee ? <label className={userPage.typeOfWork}>Full-Timer</label> :
                                        <label className={userPage.typeOfWork}>Part-Timer</label>
                                }
                            </div>
                        </div>

                </div>
                <div className={userPage.annotation}>
                    Contact information
                </div>
                <hr className={""}/>
                    <div className={userPage.contactInfo}>

                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel}>Email: </label>
                            <label className={userPage.formResponseLabel}>{user.email}</label>
                        </div>


                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel}>Vacation Days Left: </label>
                            <label className={userPage.formResponseLabel}>{user.remainingVacationDays}</label>
                        </div>
                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel}>You worked this week </label>
                            <label className={userPage.formResponseLabel} htmlFor="firstname">For {user.weeklyWorkingTime} hours</label>
                        </div>
                    </div>
            </form>
        </div>
    )
}