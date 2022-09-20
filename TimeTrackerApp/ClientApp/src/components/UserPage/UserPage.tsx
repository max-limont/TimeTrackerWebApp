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

    }, [auth, id])

    useEffect(() => {
        if (auth.state?.user && (records || lastRecord)) {
            setState({...state, showContent: true})
        }
    }, [auth])
    return (
        <div className={userPage.userForm}>



    return (

        <>
            <div className={"content-container flex-container w-100"}>
                <div className={"sick-leaves-container flex-container flex-column w-100"}>
                    <div className={"sick-leaves-panel flex-container"}>
                        <nav>
                            <a className={"button yellow-button"} onClick={() => setNumber(0)}> Personal info</a>

                            <a className={"button yellow-button"} onClick={() => setNumber(2)}> Timetracks</a>
                        </nav>
                    </div>
                    <div className={'time-tracker-list flex-container flex-column position-relative'}>

                        {number == 0 ? <>
                                <form className={'editForm'}>
                                    <div className={'row'}>
                                        <img src={`${process.env.PUBLIC_URL}/images/ava.jpg`} alt={"user-profile-image"}/>
                                        <div className={'infoContainerAbsolute'}>
                                            <label className={'nameLabel'}>{user?.firstName} </label>
                                            <label className={'nameLabel'}>{user?.lastName}</label>
                                            <div className={'typeOfWork'}>
                                                {user?.isFullTimeEmployee ?
                                                    <label className={'typeOfWork'}>Full-Timer</label>
                                                    :
                                                    <label className={'typeOfWork'}>Part-Timer</label>}
                                            </div>
                                        </div>

                                    </div>
                                    <div className={'annotation'}>
                                        Contact information
                                    </div>
                                    <hr/>

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
                                            <label className={'formResponseLabel'}
                                                   htmlFor="firstname">{(user?.weeklyWorkingTime ?? 0) / 5 / 60} hours</label>
                                        </div>
                                    </div>
                                    <div className={'annotation'}>
                                        Statistics
                                    </div>
                                    <div className="infoContainer">
                                        {auth.state?.user?.privilegesValue
                                            ? !(auth.state.user.privilegesValue & 1) ? (<></>) : (
                                                <div className={'statistic-panel'}>
                                                    <Statistics data={chartState.chart?.data ?? []}
                                                                metadata={chartState.chart?.metadata ?? defaultMetadata}/>
                                                </div>)
                                            : (<></>)}
                                    </div>

                                </form>

                            </> :
                            <div className={"time-tracker-list flex-container flex-column position-relative"}>
                                {auth.state?.user?.privilegesValue
                                    ? !(auth.state.user.privilegesValue & 1) ? (<></>) : (<div className={'statistic-panel'}>
                                        <TimeTrackerList records={timeTrackerListItems} id={parseInt(`${id}`)}/>
                                    </div>)
                                    : (<></>)}

                            </div>}

                    </div>
                </div>

            </div>


        </>)}