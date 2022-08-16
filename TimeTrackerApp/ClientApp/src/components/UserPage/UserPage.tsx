import React from 'react';
import {useAuth} from "../../hooks/useAuth";
import userPage from "./userpage.module.scss";


const UserPage = () => {
const auth = useAuth()
const user = auth.state?.user        
    return (

        <div className={userPage.userForm}>
            <div className={userPage.greetings}>
                Hello, {user?.firstName}
            </div>
            <div className={userPage.info}>
                    This is your profile page. Here you can see
                    info about yourself and edit it
            </div>

            <form className={userPage.editForm}>
                    <div className={userPage.row}>
                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel} htmlFor="email">Email:</label>
                            <input className={`${userPage.formControl} ${userPage.formControlAlternative}`} id={'email'} type="text" placeholder={user?.email}/>
                        </div>
                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel} htmlFor="firstname">FirstName:</label>
                            <input className={`${userPage.formControl} ${userPage.formControlAlternative}`} id={'firstname'} type="text" placeholder={user?.firstName}/>
                        </div>
                    </div>
                    <div className={userPage.row}>
                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel} htmlFor="lastname">LastName:</label>
                            <input className={`${userPage.formControl} ${userPage.formControlAlternative}`} id={'lastname'} type="text" placeholder={user?.lastName}/>
                        </div>
                        <div className={userPage.infoContainer}>
                            <label className={userPage.formControlLabel} htmlFor="password">Password:</label>
                            <input className={`${userPage.formControl} ${userPage.formControlAlternative}`} id={'password'} type="password" />
                        </div>
                    </div>
                <button className={userPage.btnEdit}>Edit</button>
                </form>
                {/*<button>Delete</button>*/}
        </div>
    );
};

export default UserPage;