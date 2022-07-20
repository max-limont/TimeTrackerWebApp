import { useState } from "react";

type DateObj={

    todayMonth: string,
    todayYear: string,
}


export function Controls(value:DateObj) {
    
    const [date, setDate] = useState(value)

    return (
    <div className="calendar-controls">
        <div>
            <span style={{fontSize: "25px"}}>{date.todayMonth} </span>
            <span>{date.todayYear}</span>
        </div>
        <div>
            <button>-</button>
            <button>Todday</button>
            <button>+</button>
        </div>
    </div>);
}