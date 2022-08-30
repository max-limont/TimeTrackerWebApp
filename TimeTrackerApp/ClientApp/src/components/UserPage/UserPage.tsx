import React, {FC, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {useDispatch} from "react-redux";
import {getUserById} from "../../store/user/user.slice";
import {useAppSelector} from "../../hooks/useAppSelector";


export const UserPage: FC = () => {

    const auth = useAuth()
    const user = useAppSelector((x) => x.rootReducer.user.user)
    const { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        if (auth.state?.user && id)
        {
            dispatch(getUserById({id: parseInt(id)}))
        }
    }, [auth, id])
    return (
        <div className={'userForm'}>
            <form className={'editForm'}>
                <div className={'row'}>
                    <img src={`${process.env.PUBLIC_URL}/images/ava.jpg`} alt={"user-profile-image"}/>
                        <div className={'infoContainerAbsolute'}>
                            <label className={'nameLabel'}>{user?.firstName} </label>
                            <label className={'nameLabel'}>{user?.lastName}</label>
                            <div className={'typeOfWork'}>
                                {
                                    user?.isFullTimeEmployee ?
                                        <label className={'typeOfWork'}>Full-Timer</label>
                                    :
                                        <label className={'typeOfWork'}>Part-Timer</label>
                                }
                            </div>
                        </div>

                </div>
                <div className={'annotation'}>
                    Contact information
                </div>
                <hr />
                    <div className={'contactInfo'}>
                        <div className={'infoContainer'}>
                            <label className={'formControlLabel'}>Email: </label>
                            <label className={'formResponseLabel'}>{user?.email}</label>
                        </div>


                        <div className={'infoContainer'}>
                            <label className={'formControlLabel'}>Vacation days left: </label>
                            <label className={'formResponseLabel'}>{user?.remainingVacationDays}</label>
                        </div>
                        <div className={'infoContainer'}>
                            <label className={'formControlLabel'}>Time to work per day </label>
                            <label className={'formResponseLabel'} htmlFor="firstname">{(user?.weeklyWorkingTime ?? 0) / 5 / 60} hours</label>
                        </div>
                    </div>
            </form>
        </div>
    )
}