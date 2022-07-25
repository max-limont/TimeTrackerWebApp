import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { editEventAction } from "../../../store/slice/calendar/calendarSlice";




export function EditEvent({ id }: any) {
    const dispatch = useAppDispatch();
    const [editEvent, setEvent] = useState(useAppSelector(s => s.rootReducer.calendar.events.find(s => s.id == id)));
 
    const onFinish=(e: React.FormEvent)=>{
        e.preventDefault();
        if(editEvent!=undefined)
        dispatch(editEventAction(editEvent));
    }
    if (editEvent == null || editEvent == undefined) {
        return (
            <div>Isnt Event</div>)
    }

    return (
        <form onSubmit={(e)=>onFinish(e)}>
            <table>
                <tr>
                    <td><label>Title</label></td>
                    <td><input value={editEvent?.title} onChange={(e) => setEvent({ ...editEvent, title: e.target.value })} /></td>
                </tr>
                <tr>
                    <td><label>Date</label></td>
                    <td><input value={editEvent?.date} type="date" onChange={(e) => setEvent({...editEvent, date: e.target.value})} /></td>
                </tr>
                <tr>
                    <td><label>Description</label></td>
                    <td><textarea onChange={(e)=>setEvent({...editEvent, description: e.target.value})} value={editEvent?.description}></textarea></td>
                </tr>
                
            </table>
            <button type='submit'>Edit</button>
        </form>
    )
}