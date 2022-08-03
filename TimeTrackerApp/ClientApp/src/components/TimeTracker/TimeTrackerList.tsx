import {FC} from "react";

export const TimeTrackerList: FC = () => {

    return (
        <div className={"time-tracker-list"}>
            <table className={"time-tracker-table w-100"}>
                <thead>
                    <tr>
                        <th className={"date"}>Date</th>
                        <th className={"begin"}>Begin</th>
                        <th className={"end"}>End</th>
                        <th className={"duration"}>Duration</th>
                        <th className={"comment"}>Comment</th>
                        <th className={"actions"}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>03.08.2022</td>
                        <td>12:03</td>
                        <td>18:42</td>
                        <td>06:39</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</td>
                        <td>
                            <a className={"button yellow-button"}>Edit</a>
                            <a className={"button red-button"}>Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>03.08.2022</td>
                        <td>12:03</td>
                        <td>18:42</td>
                        <td>06:39</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</td>
                        <td>
                            <a className={"button yellow-button"}>Edit</a>
                            <a className={"button red-button"}>Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>03.08.2022</td>
                        <td>12:03</td>
                        <td>18:42</td>
                        <td>06:39</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</td>
                        <td>
                            <a className={"button yellow-button"}>Edit</a>
                            <a className={"button red-button"}>Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>03.08.2022</td>
                        <td>12:03</td>
                        <td>18:42</td>
                        <td>06:39</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</td>
                        <td>
                            <a className={"button yellow-button"}>Edit</a>
                            <a className={"button red-button"}>Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <td>03.08.2022</td>
                        <td>12:03</td>
                        <td>18:42</td>
                        <td>06:39</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</td>
                        <td>
                            <a className={"button yellow-button"}>Edit</a>
                            <a className={"button red-button"}>Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}