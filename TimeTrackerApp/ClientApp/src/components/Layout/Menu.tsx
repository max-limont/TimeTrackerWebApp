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
    faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { logOut } from "../../store/slice/authentication/authSlice";
import { dispatchOut } from "../../app/store";

type MenuState = {
    collapsed: boolean
}

const initialMenuState: MenuState = {
    collapsed: false
}

export const Menu: FC = () => {
const dispatch = useAppDispatch();
    const [state, setState] = useState(initialMenuState)

    const toggle = () => {
        setState({...state, collapsed: !state.collapsed})
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
                                <a href="#" className={"flex-container"}>
                                    <FontAwesomeIcon icon={faUmbrellaBeach} className={"icon"} />
                                    <span>Vacations</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav className={"bottom-links"}>
                        <ul>
                            <li>
                                <a href="#" className={"flex-container"}>
                                    <FontAwesomeIcon icon={faGear} className={"icon"} />
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li>
                                <a className={"flex-container"} onClick={()=> dispatchOut(logOut())}>
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