import {FC} from "react";
import {useAuth} from "../../hooks/useAuth";
import {Link} from "react-router-dom";

export const Header: FC = () => {

    const auth = useAuth()

    return (
        <header className={"personal-account-header header flex-container"}>
            <div className={"breadcrumbs flex-container"}>
                <nav>
                    <a href="/">TimeTracker</a>
                    <a>Calendar</a>
                </nav>
            </div>
            <div className={"user-info flex-container"}>
                <Link to={'/user-page'} replace className={"flex-container align-items-center"}>
                    <img src={`${process.env.PUBLIC_URL}/images/ava.jpg`} alt={"user-profile-image"}/>
                    <p>{auth.state?.user?.firstName} {auth.state?.user?.lastName}</p>
                </Link>
            </div>
        </header>
    )
};