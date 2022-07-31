import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUserByIdAction } from "../../store/actions/user/userActions";

export const Header: FC = () => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState(useAppSelector(s => s.rootReducer.auth.user));
    useEffect(() => {
        dispatch(fetchUserByIdAction(1));
    });
    return (
        <header className={"personal-account-header header flex-container w-100"}>
            <div className={"breadcrumbs flex-container"}>
                <nav>
                    <a href="#">Breadcrumbs</a>
                    <a href="#">Home</a>
                </nav>
            </div>
            <div className={"user-info flex-container"}>
                <img src={`${process.env.PUBLIC_URL}/images/ava.jpg`} alt={"user-profile-image"} />
                <p>Petro Mostavchuk</p>
            </div>
        </header>
    );
}

