import {SignalData} from "../types/app.types";
import {authorizeUser} from "./auth/auth.slice";
import {store} from "./store";
import {HubConnectionBuilder} from "@aspnet/signalr";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthorizationUser} from "../types/auth.types";


console.log(window.location.origin);

var connection = new HubConnectionBuilder()
    .withUrl(window.location.origin==="http://localhost:3000"?`https://localhost:5001/MessageHub`
        :"https://timetrackerwebapp1.azurewebsites.net/MessageHub")
    .build();
 
interface SignalRState  {
    usersOnline: Number
}

const state:SignalRState ={ 
    usersOnline: 0
}

export const signalRSlice = createSlice({
    name: "signalRSlice",
    initialState: state,
    reducers: {
        authSignalR: (state) => {
            return state;
        },
        logoutR: (state)=>{
            connection.invoke("LogOut");
            return state;
        },
        setOnlineUsers: (state,action: PayloadAction<number>) => {
            return {...state, usersOnline: action.payload};
        }
    }
});

export const {authSignalR,logoutR,setOnlineUsers} = signalRSlice.actions;

connection.on("online", data =>{
    store.dispatch(setOnlineUsers(parseInt(data)));
});




connection.start();

export default  connection;