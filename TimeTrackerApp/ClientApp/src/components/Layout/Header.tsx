import { FC } from "react";

export const Header: FC = () => {
    return (
        <header className={"personal-account-header header flex-container"}>
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