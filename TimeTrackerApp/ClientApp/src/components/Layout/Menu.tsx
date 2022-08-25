import {FC, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGear,
    faArrowRightFromBracket,
    faHouse,
    faCalendarDays,
    faStopwatch,
    faUmbrellaBeach,
    faAngleLeft,
    faAngleRight,
    faAddressBook,
    faEnvelopeOpenText,
    faBookMedical,
    faLaptopMedical
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";


type MenuState = {
    collapsed: boolean
}

const initialMenuState: MenuState = {
    collapsed: false
}

export const Menu: FC = () => {

    const [state, setState] = useState(initialMenuState)
    const auth = useAuth()
    const navigate = useNavigate()

    const toggle = () => {
        setState({ ...state, collapsed: !state.collapsed })
    }

    return (
        <div className={`menu-container flex-container w-100 ${state.collapsed ? "collapsed" : ''}`}>
            <aside className={"menu flex-container flex-column"}>
                <div className={"collapse-menu-button"} onClick={() => toggle()}>
                    <FontAwesomeIcon icon={!state.collapsed ? faAngleLeft : faAngleRight} className={"icon"} />
                </div>
                <div className={"logo flex-container"}>
                    <FontAwesomeIcon icon={faStopwatch} className={"icon"} />
                    <h2>
                        TimeTracker
                    </h2>
                </div>
                <div className={"navigation-links flex-container flex-column"}>
                    <nav className={"top-links"}>
                        <h4>General</h4>
                        <ul>
                            <li>
                                <Link to={"/"} replace className={"flex-container"}>
                                    <FontAwesomeIcon icon={faHouse} className={"icon"} />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/calendar"} replace className={"flex-container"}>
                                    <FontAwesomeIcon icon={faCalendarDays} className={"icon"} />
                                    <span>Calendar</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/vacation"} className={"flex-container"}>
                                    <FontAwesomeIcon icon={faUmbrellaBeach} className={"icon"} />
                                    <span>Vacations</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/sick-leaves"} replace className={"flex-container"}>
                                    <FontAwesomeIcon icon={faLaptopMedical} className={"icon"} />
                                    <span>Sick leaves</span>
                                </Link>
                            </li>
                        </ul>
                        <h4>Management</h4>
                        <ul>
                            <li>
                                <Link to={"/user-list"} replace className={"flex-container"}>
                                    <FontAwesomeIcon icon={faAddressBook} className={"icon"} />
                                    <span>Employees</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/manage-vacation"} replace className={"flex-container"}>
                                    <FontAwesomeIcon icon={faEnvelopeOpenText} className={"icon"} />
                                    <span>Vacation requests</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={"/manage-sick-leaves"} replace className={"flex-container"}>
                                    <FontAwesomeIcon icon={faBookMedical} className={"icon"} />
                                    <span>Sick leaves requests</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <nav className={"bottom-links"}>
                        <h4>Account</h4>
                        <ul>
                            <li>
                                <a href="#" className={"flex-container"}>
                                    <FontAwesomeIcon icon={faGear} className={"icon"} />
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li>
                                <a className={"flex-container"} onClick={() => {
                                    auth.signOut(() => navigate('/login', {replace: true}))
                                }}>
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} className={"icon"} />
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
}