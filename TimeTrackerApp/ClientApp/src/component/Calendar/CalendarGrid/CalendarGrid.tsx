import moment from "moment";
import { Day } from "./Day/Day";

interface Obj{
    startDay:moment.Moment
}


export function CalendarGrid(DayParam:Obj){
    const totalDays= 42;
    const day = DayParam.startDay.clone().subtract(1, "day");
    const daysArray = [...Array(totalDays)].map(()=>day.add(1, "day").clone())
    console.log(moment().date())
    return(
        <div className="calendar-grid">
            {
                daysArray.map((dayItem,value)=>{
                    return(
                        <Day key={value} date={dayItem.format("yyyy-MM-DD")} isWeekend={false} isCurrentDay={dayItem.date()===moment().date()?true:false} event={[]}/>
                        );
                })
            }
        </div>
 
    );
}